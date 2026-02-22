import { cartModel } from "./models/cartModel.js";

class cartDBManager {

    static async get() {
        return cartModel.find();
    }

    static async getBy(filtro) {
        const cart = await cartModel.findOne(filtro);
        //.populate('products.product'); Usar el populate en el controller adecuado

        if (!cart) throw new Error(`El carrito ${filtro} no existe!`);
        
        return cart;
    }

    static async create() {
        let newCart = await cartModel.create({products: []});
        return newCart;
        
    }

    static async update(cid, products) {

        await cartModel.updateOne({ _id: cid }, { products });
        return await this.getBy(cid);
    }

    static async deleteAllProducts(cid) {

        await cartModel.updateOne({ _id: cid }, { products: [] });
        return await this.getBy(cid)
    }
}

export { cartDBManager };