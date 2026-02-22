import { procesaErrores } from "../utils/utils.js"
import { productDBManager as ProductService } from "../dao/productDBManager.js";
import { cartDBManager as CartService } from "../dao/cartDBManager.js";

export class ViewsController{
    static async viewHome(req, res){
        try {
            res.status(200).render(
            'index',
            {
                title: req.title ? req.title : 'Home',
                style: 'index.css'
            }
        )
        } catch (error) {
         procesaErrores(res, error)   
        }
    }

    static async viewAllProducts(req, res){
        try {
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
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async viewRealTimeProducts(req, res){
        try {
            const products = await ProductService.getAllProducts(req.query);
            res.status(200).render(
                'realTimeProducts',
                {
                    title: 'Productos',
                    style: 'index.css',
                    products: JSON.parse(JSON.stringify(products.docs))
                }
            )
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async viewCart(req, res){
        try {
            const response = await CartService.getProductsFromCartByID(req.params.cid);
            if (response.status === 'error') {
                return res.status(404).render(
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
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async viewRegister(req, res){
        try {
            res.status(200).render(
                'register',
                {
                    title: 'Regístrese',
                    style: 'index.css'
                }
            );
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async viewLogin(req, res){
        try {
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
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async viewCurrent(req, res){
        try {
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
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async viewError(req, res){
        try {
            res.status(401).render(
                'errorUnauthorized',
                {
                    style: 'index.css'
                }
            )
        } catch (error) {
            procesaErrores(res, error)
        }
    }
}