export class CartService{
    constructor(cartsDAO){
        this.cartsDAO = cartsDAO
    }

    async get(params){
        return await this.cartsDAO.get(params);
    }

    async getBy(filter){
        return await this.cartsDAO.getBy(filter);
    }

    async create(product){
        return await this.cartsDAO.create(product);
    }

    async update(id, product){
        return await this.cartsDAO.update(id, product);
    }

    async delete(id){
        return await this.cartsDAO.delete(id);
    }
}