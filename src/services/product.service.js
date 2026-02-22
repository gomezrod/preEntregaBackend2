export class ProductService{
    constructor(productsDAO){
        this.productsDAO = productsDAO
    }

    async get(params){
        return await this.productsDAO.get(params);
    }

    async getBy(filter){
        return await this.productsDAO.getBy(filter);
    }

    async create(product){
        return await this.productsDAO.create(product);
    }

    async update(id, product){
        return await this.productsDAO.update(id, product);
    }

    async delete(id){
        return await this.productsDAO.delete(id);
    }
}