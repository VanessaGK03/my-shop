import { Router } from 'express';
import userController from './controllers/userController.js';
import productController from './controllers/productController.js';
import deliveryCompanyController from './controllers/deliveryCompanyController.js'
import storeController from './controllers/storeController.js'
import orderController from './controllers/orderController.js';

const routes = Router();

routes.use('/users', userController);
routes.use('/products', productController);
routes.use('/delivery', deliveryCompanyController);
routes.use('/store', storeController);
routes.use('/orders', orderController);
routes.use('/stats', statsController);


export default routes;