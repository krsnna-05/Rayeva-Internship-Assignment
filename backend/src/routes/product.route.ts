import { Router } from 'express';

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from '@src/controller/product.controller';

const productRouter = Router();

productRouter.post('/', createProduct);
productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.delete('/:id', deleteProduct);

export default productRouter;
