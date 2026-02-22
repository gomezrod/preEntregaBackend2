import { ProductService } from "./product.service.js";
import { productDBManager as productDAO } from "../dao/productDBManager.js";
import { CartService } from "./cart.service.js";
import { cartDBManager as cartDAO } from "../dao/cartDBManager.js";
export const productService = new ProductService(productDAO);
export const cartService = new CartService(cartDAO);