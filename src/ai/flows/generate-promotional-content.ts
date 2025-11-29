'use server';

/**
 * @fileOverview A flow that generates promotional content for UMKM products.
 *
 * - generatePromotionalContent - A function that generates promotional content including captions and posters.
 * - GeneratePromotionalContentInput - The input type for the generatePromotionalContent function.
 * - GeneratePromotionalContentOutput - The return type for the generatePromotionalContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromotionalContentInputSchema = z.object({
  productName: z.string().describe('The name of the product to promote.'),
  productDescription: z.string().describe('A detailed description of the product.'),
  productPrice: z.number().describe('The price of the product.'),
  productCategory: z.string().describe('The category of the product (e.g., clothing, food, electronics).'),
  targetAudience: z.string().describe('The target audience for the product (e.g., young adults, families, professionals).'),
  promotionType: z.enum(['caption', 'poster']).describe('The type of promotional content to generate (caption or poster).'),
  templateStyle: z.string().describe('The desired style of the promotional content (e.g., minimalist, elegant, modern).'),
});
export type GeneratePromotionalContentInput = z.infer<typeof GeneratePromotionalContentInputSchema>;

const GeneratePromotionalContentOutputSchema = z.object({
  content: z.string().describe('The generated promotional content (caption or poster description).'),
});
export type GeneratePromotionalContentOutput = z.infer<typeof GeneratePromotionalContentOutputSchema>;

export async function generatePromotionalContent(
  input: GeneratePromotionalContentInput
): Promise<GeneratePromotionalContentOutput> {
  return generatePromotionalContentFlow(input);
}

const generatePromotionalContentPrompt = ai.definePrompt({
  name: 'generatePromotionalContentPrompt',
  input: {schema: GeneratePromotionalContentInputSchema},
  output: {schema: GeneratePromotionalContentOutputSchema},
  prompt: `You are an AI assistant specializing in generating promotional content for UMKM products.

  Based on the product details and the desired promotion type, create compelling and engaging content.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Product Price: {{{productPrice}}}
  Product Category: {{{productCategory}}}
  Target Audience: {{{targetAudience}}}
  Promotion Type: {{{promotionType}}}
  Template Style: {{{templateStyle}}}

  Content:`,// Handlebars
});

const generatePromotionalContentFlow = ai.defineFlow(
  {
    name: 'generatePromotionalContentFlow',
    inputSchema: GeneratePromotionalContentInputSchema,
    outputSchema: GeneratePromotionalContentOutputSchema,
  },
  async input => {
    const {output} = await generatePromotionalContentPrompt(input);
    return output!;
  }
);
