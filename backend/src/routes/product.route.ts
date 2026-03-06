import { Router } from 'express';

import addProduct from '@src/controller/product.controller';

const productRouter = Router();

productRouter.post('/product', addProduct);

export default productRouter;
