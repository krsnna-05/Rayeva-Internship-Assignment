import { model, Schema } from 'mongoose';

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  seo_tags: string[];
  sustainability_attributes: string[];
};

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, default: 'Uncategorized' },
    seo_tags: { type: [String], default: [] },
    sustainability_attributes: { type: [String], default: [] },
  },
  { timestamps: true },
);

const Product = model('Product', productSchema);

export default Product;

export type { Product };
