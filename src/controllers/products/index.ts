import { Request, Response } from "express";
import { ProductBusiness } from "../../business/products";
import { ZodError } from "zod";
import { BaseError } from "../../errors/BaseError";
import { CreateProductsInputSchema, ProductDeleteSchema, ProductsUpdateInputSchema } from "../../dto/products";
import { HTTP_STATUS } from "../../services/HTTP_STATUS_CODE/HTTP_STATUS_CODE";

export class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ){}

    public GetProducts = async (req: Request, res: Response): Promise<void> => {
        try{
            const output = await this.productBusiness.getProducts();
            res.status(HTTP_STATUS.SUCCESS).send(output);
        }catch (err) {            
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            }else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public CreateProducts = async (req: Request, res: Response): Promise<void> => {
        try{
            const input = CreateProductsInputSchema.parse({
                authorization: req.headers.authorization,
                ...req.body
            });

            const output = await this.productBusiness.createProduct(input);
            res.status(HTTP_STATUS.CREATED).send(output);
        }catch (err) {            
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            }else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public UpdateProducts = async (req: Request, res: Response): Promise<void> => {
        try{
            const input = ProductsUpdateInputSchema.parse({
                authorization: req.headers.authorization,
                id: req.params.id,
                ...req.body
            });

            const output = await this.productBusiness.updateProduct(input);
            res.status(HTTP_STATUS.SUCCESS).send(output);
        }catch (err) {            
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            }else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public DeleteProducts = async (req: Request, res: Response): Promise<void> => {
        try{
            const input = ProductDeleteSchema.parse({
                authorization: req.headers.authorization,
                id: req.params.id
            });

            const output = await this.productBusiness.deleteProduct(input);
            res.status(HTTP_STATUS.SUCCESS).send(output);
        }catch (err) {            
            if (err instanceof ZodError) {
                res.status(400).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            }else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }
}