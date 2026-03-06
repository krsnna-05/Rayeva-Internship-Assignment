import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
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
