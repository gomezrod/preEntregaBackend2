import { Router } from 'express';
// import { productDBManager as ProductService } from '../dao/productDBManager.js';
import { cartDBManager as CartService } from '../dao/cartDBManager.js';
import { CartController } from '../controller/cart.controller.js';

const router = Router();
// const ProductService = new productDBManager();
// const CartService = new cartDBManager(ProductService);

router.get('/:cid', CartController.getCart);
router.get('/', CartController.getCarts);
router.post('/', CartController.createCart);
router.post('/:cid/product/:pid', CartController.addProduct);
router.delete('/:cid/product/:pid', CartController.deleteProduct);
router.patch('/:cid', CartController.updateProducts);
router.put('/:cid/product/:pid', CartController.updateProduct);
router.delete('/:cid', CartController.deleteCart);

export default router;