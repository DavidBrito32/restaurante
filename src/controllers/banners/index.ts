import { Request, Response } from "express";
import { BannersBusiness } from "../../business/banners";
import { ZodError } from "zod";
import { BaseError } from "../../errors/BaseError";
import { CreateBannersInputSchema, DeleteBannersInputSchema, UpdateBannersInputSchema } from "../../dto/banners";


export class BannersController {
    constructor(
        private readonly bannerBusiness: BannersBusiness
    ){}

    public GetBanners = async (req: Request, res: Response): Promise<void> => {
        try{
            res.status(200).send(await this.bannerBusiness.getBanners());
        }catch (err) {
            if (err instanceof ZodError) {
                res.status(400).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            }else {
                res.status(500).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public CreateBanner = async (req: Request, res: Response): Promise<void> => {
        try{
            const input = CreateBannersInputSchema.parse({
                authorization: req.headers.authorization,
                ...req.body
            });
            const output = await this.bannerBusiness.createBanners(input);
            res.status(201).send(output);            
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            }else {
                res.status(500).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public UpdateBanner = async (req: Request, res: Response): Promise<void> => {
        try{
            const input = UpdateBannersInputSchema.parse({
                authorization: req.headers.authorization,
                id: req.params.id,
                ...req.body
            });

            const output = await this.bannerBusiness.updateBanners(input);

            res.status(200).send(output);
        }catch (err) {
            if (err instanceof ZodError) {
                res.status(400).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            }else {
                res.status(500).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public DeleteBanner = async (req: Request, res: Response): Promise<void> => { 
        try {

            const input = DeleteBannersInputSchema.parse({
                authorization: req.headers.authorization,
                id: req.params.id
            });

            const output = await this.bannerBusiness.deleteBanner(input);
            res.status(200).send(output);
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            }else {
                res.status(500).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }
}