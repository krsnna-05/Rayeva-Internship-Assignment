import type { Request, Response } from 'express';

import Product from '@src/models/product.model';

const addProduct = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ error: 'Name, description and category are required' });
  }

  try {
    const createdProduct = await Product.create({
      name,
      description,
      category: '',
      seo_tags: [],
      sustainability_attributes: [],
    });

    return res.status(201).json({
      message: 'Product created successfully',
      product: createdProduct,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create product' });
  }
};

export default addProduct;
