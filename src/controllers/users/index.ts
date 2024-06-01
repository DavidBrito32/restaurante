import { Request, Response } from "express";
import { UsersBusiness } from "../../business/users";
import { BaseError } from "../../errors/BaseError";
import { ZodError } from "zod";
import { InputUserDTO, InsertUserSchema } from "../../dto/users";

export class UserController {
    constructor(private readonly userBusiness: UsersBusiness){}

    public getAllUsers = async (req: Request, res: Response) => {
        try{
            const data = await this.userBusiness.GetAllUsers();

            res.status(200).send(data)
        }catch (err) {
			if (err instanceof ZodError) {
				res.status(400).send(err.issues);
			} else if (err instanceof BaseError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send(`Erro não tratado: DESC: ${err}`);
			}
		}
    }

    public createUser = async (req: Request, res: Response) => {
        try{
			console.log(req.body)
            const data: InputUserDTO = InsertUserSchema.parse({
				authorization: req.headers.authorization,
				...req.body
			});

			res.status(201).send(await this.userBusiness.CreateUser(data));

        }catch (err) {
			if (err instanceof ZodError) {
				res.status(400).send(err.issues);
			} else if (err instanceof BaseError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send(`Erro não tratado: DESC: ${err}`);
			}
		}
    }
}