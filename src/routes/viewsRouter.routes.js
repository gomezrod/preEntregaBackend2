import { Router } from 'express';
import { initPassport } from '../config/config.passport.js';
import passport from 'passport';
import { ViewsController } from '../controller/views.controller.js';

const router = Router();

initPassport();
router.use(passport.initialize());

router.get('/', ViewsController.viewHome);
router.get('/products', ViewsController.viewAllProducts);
router.get('/realtimeproducts', ViewsController.viewRealTimeProducts);
router.get('/cart/:cid', ViewsController.viewCart);
router.get('/register', ViewsController.viewRegister);
router.get('/login', ViewsController.viewLogin);
router.get('/current', passport.authenticate("current", {session: false, failureRedirect: '/error' }), ViewsController.viewCurrent);
router.get('/error', ViewsController.viewError);

export default router;