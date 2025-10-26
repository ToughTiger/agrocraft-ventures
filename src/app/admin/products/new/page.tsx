'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createProduct, getCategories } from '@/lib/queries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import type { Category } from '@/lib/types';

const productFormSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  stock: z.coerce.number().int().min(0, 'Stock must be a non-negative integer'),
  categoryId: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  imageHint: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: '',
      imageUrl: '',
      imageHint: '',
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await createProduct(data);
      toast({
        title: 'Product Created',
        description: `${data.name} has been successfully added.`,
      });
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Creation Failed',
        description: 'There was a problem creating the product.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>Fill out the form below to add a new product to the store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Organic Turmeric Powder" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the product..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                        <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://picsum.photos/seed/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Hint</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 'turmeric powder'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creating...' : 'Create Product'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
