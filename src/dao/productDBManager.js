import productModel from "./models/productModel.js";

class productDBManager {

    static async getAllProducts(params) {
        const paginate = {
            page: params.page ? parseInt(params.page) : 1,
            limit: params.limit ? parseInt(params.limit) : 10,
        }
        const PORT = process.env.PORT

        if (params.sort && (params.sort === 'asc' || params.sort === 'desc')) paginate.sort = { price: params.sort}

        const products = await productModel.paginate({}, paginate);

        products.prevLink = products.hasPrevPage?`http://localhost:${PORT}/products?page=${products.prevPage}` : null;
        products.nextLink = products.hasNextPage?`http://localhost:${PORT}/products?page=${products.nextPage}` : null;

        //Add limit
        if (products.prevLink && paginate.limit !== 10) products.prevLink += `&limit=${paginate.limit}`
        if (products.nextLink && paginate.limit !== 10) products.nextLink += `&limit=${paginate.limit}`

        //Add sort
        if (products.prevLink && paginate.sort) products.prevLink += `&sort=${params.sort}`
        if (products.nextLink && paginate.sort) products.nextLink += `&sort=${params.sort}`

        return products;
    }

    static async getProductByID(pid) {
        const product = await productModel.findOne({_id: pid}).lean();

        if (!product) throw new Error(`El producto ${pid} no existe!`);

        return product;
    }

    static async createProduct(product) {
        const {title, description, code, price, stock, category, thumbnails} = product;

        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Error al crear el producto');
        }

        return await productModel.create({title, description, code, price, stock, category, thumbnails});  
    }

    static async updateProduct(pid, productUpdate) {
        return await productModel.updateOne({_id: pid}, productUpdate);
    }

    static async deleteProduct(pid) {
        const result = await productModel.deleteOne({_id: pid});

        if (result.deletedCount === 0) throw new Error(`El producto ${pid} no existe!`);

        return result;
    }
}

export { productDBManager };