import { model, Schema } from 'mongoose';

type product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  seo_tags: string[];
  sustainability_attributes: string[];
};

const productSchema = new Schema<product>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    seo_tags: [{ type: String }],
    sustainability_attributes: [{ type: String }],
  },
  { timestamps: true },
);

const Product = model('Product', productSchema);

export default Product;

export type { product };
