import { Router } from 'express';
import { uploader } from '../utils/multerUtil.js';
import { ProductController } from '../controller/product.controller.js';

const router = Router();
// const ProductService = new productDBManager();

router.get('/', ProductController.getProducts);
router.get('/:pid', ProductController.getProductById);
router.post('/', uploader.array('thumbnails', 3), ProductController.createProduct);
router.patch('/:pid', uploader.array('thumbnails', 3), ProductController.updateProduct);
router.delete('/:pid', ProductController.deleteProduct);

export default router;