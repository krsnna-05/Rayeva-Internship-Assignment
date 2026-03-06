import { generateText, Output } from 'ai';
import { ollama } from 'ai-sdk-ollama';
import devEnv from 'config/ts-env/dev-env';
import { z } from 'zod';

import aiPrompt from './prompts/product.json';

type ProductData = {
  productName: string;
  productDescription: string;
};

class AIService {
  protected metaDataSchema = z.object({
    primary_category: z
      .string()
      .describe(
        'Broad high-level product category. Must be one of the general catalog groups such as Home, Kitchen, Packaging, Personal Care, Office, Cleaning, Food & Beverage, or Lifestyle.',
      ),
    sub_category: z
      .string()
      .describe(
        'More specific classification within the primary category describing the product type. Example: Oral Care, Drinkware, Food Containers, Stationery.',
      ),
    seo_tags: z
      .array(z.string())
      .describe(
        'List of 5–8 normalized search keywords used for product discovery. Tags must be lowercase, short phrases or singular nouns, contain no punctuation, and avoid duplicates or variations of the same word.',
      ),
    sustainability_attributes: z
      .array(z.string())
      .describe(
        'Environmental characteristics of the product related to sustainability. Examples include biodegradable, compostable, reusable, plastic free, recycled, or eco friendly.',
      ),
  });

  async generateMetaData(productData: ProductData) {
    const prompt = this.generatePrompt(productData);

    const res = await generateText({
      model: ollama(devEnv.OLLAMA_MODEL_ID),
      prompt,
      output: Output.object({
        schema: this.metaDataSchema,
      }),
    });

    return res.output;
  }

  protected askAI(prompt: string) {}

  protected generatePrompt(productData: ProductData): string {
    const { productName, productDescription } = productData;

    return aiPrompt.product
      .replace('{{product_name}}', productName)
      .replace('{{product_description}}', productDescription);
  }
}

export default new AIService();
