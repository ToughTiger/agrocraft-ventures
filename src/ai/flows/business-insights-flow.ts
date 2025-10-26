'use server';
/**
 * @fileOverview Business insights AI agent.
 *
 * - generateBusinessInsights - A function that analyzes sales and product data.
 * - BusinessInsightsInput - The input type for the function.
 * - BusinessInsightsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProductDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  stock: z.number(),
  price: z.number(),
});

const OrderDataSchema = z.object({
  id: z.string(),
  total: z.number(),
  status: z.string(),
  createdAt: z.string().describe('ISO 8601 date string'),
});

const BusinessInsightsInputSchema = z.object({
  products: z.array(ProductDataSchema),
  orders: z.array(OrderDataSchema),
});
export type BusinessInsightsInput = z.infer<typeof BusinessInsightsInputSchema>;

const InsightSchema = z.object({
    type: z.enum(["Positive Trend", "Area for Improvement", "Opportunity", "General Observation"]).describe("The category of the insight."),
    summary: z.string().describe("A concise, one-sentence summary of the insight. Be direct and actionable.")
});

const BusinessInsightsOutputSchema = z.object({
  insights: z.array(InsightSchema).describe('A list of 3-4 key business insights.'),
});
export type BusinessInsightsOutput = z.infer<typeof BusinessInsightsOutputSchema>;

export async function generateBusinessInsights(input: BusinessInsightsInput): Promise<BusinessInsightsOutput> {
  return businessInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'businessInsightsPrompt',
  input: { schema: BusinessInsightsInputSchema },
  output: { schema: BusinessInsightsOutputSchema },
  prompt: `You are a world-class business analyst for an agricultural products company called Agrocraft. Your task is to analyze the provided sales and product data to generate sharp, actionable business insights.

Analyze the following data:

**Product Data:**
{{#each products}}
- Name: {{name}}, Stock: {{stock}}, Price: {{price}}
{{/each}}

**Order Data:**
{{#each orders}}
- Order ID: {{id}}, Total: {{total}}, Status: {{status}}, Date: {{createdAt}}
{{/each}}

Based on this data, provide a list of 3-4 key insights. For each insight, categorize it as a "Positive Trend", "Area for Improvement", "Opportunity", or "General Observation". Focus on what is most important for a business owner to know. Be concise and direct. Examples: identify top-selling products, suggest re-stocking low-inventory items, or point out sales trends.`,
});

const businessInsightsFlow = ai.defineFlow(
  {
    name: 'businessInsightsFlow',
    inputSchema: BusinessInsightsInputSchema,
    outputSchema: BusinessInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
