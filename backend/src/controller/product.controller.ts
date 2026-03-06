import type { Request, Response } from 'express';

import Product from '@src/models/product.model';

const createProduct = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  try {
    const createdProduct = await Product.create({
      name,
      description,
      // Dummy placeholders for AI metadata fields until AI integration is added.
      category: 'Uncategorized',
      seo_tags: ['eco-product', 'placeholder-tag'],
      sustainability_attributes: ['to-be-generated'],
    });

    return res.status(201).json({
      message: 'Product created successfully',
      product: createdProduct,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create product' });
  }
};

const getProducts = async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  try {
    const [products, total] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(),
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete product' });
  }
};

export { createProduct, deleteProduct, getProductById, getProducts };
