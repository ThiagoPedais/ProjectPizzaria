import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';

import uploadConifg from './config/multer';
import multer from 'multer';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';



const router = Router();
const upload = multer(uploadConifg.upload("./tmp"));

// Routes user
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle);

// Routes category
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoryController().handle);

// Routes products
router.post('/product', isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.get('/category/products', isAuthenticated, new ListByCategoryController().handle);

// Routes orders
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);


export { router };