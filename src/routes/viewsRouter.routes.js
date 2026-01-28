import { Router } from 'express';
import { productDBManager as ProductService } from '../dao/productDBManager.js';
import { cartDBManager as CartService} from '../dao/cartDBManager.js';
import { initPassport } from '../config/config.passport.js';
import passport from 'passport';

const router = Router();

initPassport();
router.use(passport.initialize());

router.get('/', (req,res)=>{
    
    res.status(200).render(
        'index',
        {
            title: req.title ? req.title : 'Home',
            style: 'index.css'
        }
    )
});

router.get('/products', async (req, res) => {
    const products = await ProductService.getAllProducts(req.query);

    res.status(200).render(
        'index',
        {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs)),
            prevLink: {
                exist: products.prevLink ? true : false,
                link: products.prevLink
            },
            nextLink: {
                exist: products.nextLink ? true : false,
                link: products.nextLink
            }
        }
    )
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await ProductService.getAllProducts(req.query);
    res.status(200).render(
        'realTimeProducts',
        {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs))
        }
    )
});

router.get('/cart/:cid', async (req, res) => {
    const response = await CartService.getProductsFromCartByID(req.params.cid);

    if (response.status === 'error') {
        return res.render(
            'notFound',
            {
                title: 'Not Found',
                style: 'index.css'
            }
        );
    }

    res.status(200).render(
        'cart',
        {
            title: 'Carrito',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(response.products))
        }
    )
});

router.get('/register', (req,res)=>{
    
    res.status(200).render(
        'register',
        {
            title: 'Regístrese',
            style: 'index.css'
        }
    );
});

router.get('/login', (req,res)=>{
    if (req.query.loggedout) {
        return res.status(200).render(
            'login',
            {
                title: 'Login',
                style: 'index.css',
                message: 'Logout exitoso!'
            }
        );
    }

    return res.status(200).render(
        'login',
        {
            title: 'Login',
            style: 'index.css'
        }
    );
});

router.get('/current', passport.authenticate("current", {session: false, failureRedirect: '/error' }), (req,res)=>{

    
    // const {first_name, last_name, age, email} = req.user
    const datos = {...req.user}
    if(req.query.loggedin){
     datos.message=`Login exitoso para ${datos.first_name}!`   
     console.log(datos);
     
    }
    res.status(200).render(
        'datos',
        {
            style: 'index.css',
            ...datos
        }
    )
});

router.get('/error', (req, res) => {
    res.status(401).render(
        'errorUnauthorized',
        {
            style: 'index.css'
        }
    )
})

export default router;