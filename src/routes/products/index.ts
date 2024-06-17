import Express from "express";
import { ProductController } from "../../controllers/products";
import { ProductBusiness } from "../../business/products";
import { ProductsDatabase } from "../../database/products";
import { IdGenerator } from "../../services/uuid";
import { TokenManager } from "../../services/tokenManager";


export const Products = Express.Router();
const controller = new ProductController(new ProductBusiness(new ProductsDatabase(), new IdGenerator(), new TokenManager()));

Products.get("/", controller.GetProducts);

Products.post("/", controller.CreateProducts);

Products.put("/:id", controller.UpdateProducts);

Products.delete("/:id", controller.DeleteProducts);