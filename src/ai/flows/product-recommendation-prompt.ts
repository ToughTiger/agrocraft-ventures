'use server';
/**
 * @fileOverview Product recommendation AI agent.
 *
 * - productRecommendation - A function that handles the product recommendation process.
 * - ProductRecommendationInput - The input type for the productRecommendation function.
 * - ProductRecommendationOutput - The return type for the productRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationInputSchema = z.object({
  browsingHistory: z.string().describe('The browsing history of the user.'),
  purchaseHistory: z.string().describe('The purchase history of the user.'),
});
export type ProductRecommendationInput = z.infer<typeof ProductRecommendationInputSchema>;

const ProductRecommendationOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of product recommendations for the user.'),
});
export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function productRecommendation(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return productRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  prompt: `You are an expert shopping assistant specializing in recommending products to users.

You will use the user's browsing history and purchase history to recommend products that the user might be interested in.

Browsing History: {{{browsingHistory}}}
Purchase History: {{{purchaseHistory}}}

Recommendations:`, // Removed triple curly braces
});

const productRecommendationFlow = ai.defineFlow(
  {
    name: 'productRecommendationFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
