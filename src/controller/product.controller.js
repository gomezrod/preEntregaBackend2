import { procesaErrores } from "../utils/utils.js";
import { productService as ProductService } from "../services/index.js";

export class ProductController {
    static async getProducts(req, res) {
        try {
            const result = await ProductService.get(req.query);
            res.status(200).send({
                status: 'success',
                payload: result
            });
        }
        catch (error) {
            procesaErrores(res, error)
        }
    }

    static async getProductById(req, res){
        try {
            const result = await ProductService.getBy(req.params.pid);
            res.status(200).send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async createProduct(req, res) {
        if (req.files) {
            req.body.thumbnails = [];
            req.files.forEach((file) => {
                req.body.thumbnails.push(file.path);
            });
        }

        try {
            const result = await ProductService.create(req.body);
            res.status(201).send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async updateProduct(req, res) {
        if (req.files) {
            req.body.thumbnails = [];
            req.files.forEach((file) => {
                req.body.thumbnails.push(file.filename);
            });
        }

        try {
            const result = await ProductService.update(req.params.pid, req.body);
            res.status(200).send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async deleteProduct(req, res) {
        try {
            const result = await ProductService.delete(req.params.pid);
            res.status(200).send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            procesaErrores(res, error)
        }
    }
}
