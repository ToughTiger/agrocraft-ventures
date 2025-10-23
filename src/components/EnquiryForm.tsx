'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';

const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  // otp: z.string().optional(), // For future use
  productName: z.string(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

interface EnquiryFormProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnquiryForm({ product, open, onOpenChange }: EnquiryFormProps) {
  const { toast } = useToast();
  // const [otpSent, setOtpSent] = useState(false); // For future use
  // const [verifying, setVerifying] = useState(false); // For future use

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      // otp: '',
      productName: product.name,
    },
  });

  const onSubmit = (data: EnquiryFormValues) => {
    console.log('Enquiry Submitted:', data);
    toast({
      title: 'Enquiry Sent!',
      description: `We've received your enquiry for ${product.name}. We will get back to you shortly.`,
    });
    onOpenChange(false);
    form.reset();
    // setOtpSent(false); // For future use
  };

  /*
  // --- OTP Logic for Future Use ---
  const handleSendOtp = async () => {
    const mobile = form.getValues('mobile');
    if (mobile.length < 10) {
      form.setError('mobile', { message: 'Please enter a valid mobile number.' });
      return;
    }
    // Simulate sending OTP
    console.log(`Sending OTP to ${mobile}`);
    toast({ title: 'OTP Sent', description: `An OTP has been sent to ${mobile}` });
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    const otp = form.getValues('otp');
    if (!otp || otp.length !== 6) {
      form.setError('otp', { message: 'Please enter the 6-digit OTP.' });
      return;
    }
    setVerifying(true);
    // Simulate verifying OTP
    console.log(`Verifying OTP ${otp}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setVerifying(false);
    toast({ title: 'Mobile Verified!', description: 'Your mobile number has been successfully verified.' });
    // Here you would typically proceed with form submission or enable the submit button
  };
  */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Price on Request</DialogTitle>
          <DialogDescription>
            You are enquiring for the product: <span className="font-semibold text-foreground">{product.name}</span>.
            Please fill out your details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="10-digit mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 
            // --- OTP UI for Future Use ---
            <div className="space-y-2">
              <FormLabel>Mobile Verification</FormLabel>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={handleSendOtp} disabled={otpSent}>
                  {otpSent ? 'OTP Sent' : 'Send OTP'}
                </Button>
              </div>
              {otpSent && (
                <div className="flex items-center gap-2 pt-2">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input placeholder="Enter 6-digit OTP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" onClick={handleVerifyOtp} disabled={verifying}>
                    {verifying ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
              )}
            </div>
            */}

            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
