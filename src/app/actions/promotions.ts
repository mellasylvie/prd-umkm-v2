'use server';

import {
  generatePromotionalContent,
  type GeneratePromotionalContentInput,
} from '@/ai/flows/generate-promotional-content';

export async function generatePromotionalContentAction(
  input: GeneratePromotionalContentInput
) {
  try {
    const output = await generatePromotionalContent(input);
    return { data: output };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed to generate content: ${errorMessage}` };
  }
}
