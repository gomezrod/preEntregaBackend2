import { procesaErrores } from "../utils/utils.js";
import { cartService as CartService } from "../services/index.js";
import { productService as ProductService } from "../services/index.js";

export class CartController{

    static async getCarts(req, res){
        try {
            const result = await CartService.get();
            res.send({
            status: 'success',
            payload: result
            });
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async getCart(req, res){
        try {
        const result = await CartService.getBy(req.params.cid);
        res.send({
            status: 'success',
            payload: result
        });
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async createCart(req, res){
        try {
        const result = await CartService.create();
        res.send({
            status: 'success',
            payload: result
        });
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async addProduct(req, res) {
        try {
            const {cid, pid} = req.params
            const product = await ProductService.getBy({_id:pid});
            let cart = await CartService.getBy({_id:cid});
            if (!product) throw new Error(`El producto ${pid} no existe!`);
            if (!cart) throw new Error(`El carrito ${cid} no existe!`);

            let i = null;
            const itemIndex = cart.products.filter(
                (item, index) => {
                    console.log(item.product);
                    
                    if (item.product.toString() === pid) i = index;
                    return item.product.toString() === pid;
                }
            );

            if (itemIndex.length > 0) {
                console.log(cart.products[i].quantity);
                cart.products[i].quantity += 1;
            } else {
                cart.products.push({
                    product: pid,
                    quantity: 1
                });
            }

            await CartService.update({ _id: cid }, cart.products);
            const result = await CartService.getBy({_id:cid});
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async deleteProduct(req, res) {
        try {
        const {cid, pid} = req.params;
        const product = await ProductService.getBy(pid);
        const cart = await CartService.getBy(cid);

        if (!product) throw new Error(`El producto ${pid} no existe!`);
        if (!cart) throw new Error(`El carrito ${cid} no existe!`);
    
        let i = null;
        const result = cart.products.filter(
            (item, index) => {
                if (item.product.toString() === pid) i = index;
                return item.product.toString() === pid;
            }
        );

        if (result.length > 1) {
            cart.products[i].quantity -= 1;
        } else {
            const newProducts = cart.products.filter(item => item.product.toString() !== pid);
            await CartService.update(cid, newProducts);
        }
        
        result = await CartService.getBy(cid);
        res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async updateProduct(req, res){
        try {
            const {cid, pid} = req.params;
            const {quantity = 1} = req.body;
            const product = await ProductService.getBy(pid);
            const cart = await CartService.getBy(cid);
            if(!product) throw new Error(`El producto ${pid} no existe!`);
            if(!cart) throw new Error(`El carrito ${cid} no existe!`);
            const productIndex = cart.products.findIndex(
                (item) => {
                    item.product.toString() === pid;
                }
            )
            if(productIndex !== -1){
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.push({product: pid, quantity: quantity})
            }
            const result = await CartService.update(cid, cart)
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
          procesaErrores(res, error)  
        }
    }

    static async updateProducts(req, res){
        try {
            const result = await CartService.update(req.params.cid, req.body.products)
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async deleteCart(req, res){
        try {
            const result = await CartService.deleteAllProducts(req.params.cid)
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            procesaErrores(res, error)
        }
    }
}