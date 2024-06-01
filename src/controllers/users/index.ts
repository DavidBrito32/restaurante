import { Request, Response } from "express";
import { UsersBusiness } from "../../business/users";
import { BaseError } from "../../errors/BaseError";
import { ZodError } from "zod";
import { GetUserSchema, InputUserDTO, InsertUserSchema, LoginSchema, UpdateUserSchema } from "../../dto/users";

export class UserController {
    constructor(private readonly userBusiness: UsersBusiness){}

    public getAllUsers = async (req: Request, res: Response) => {
        try{
			const token = GetUserSchema.parse({
				authorization: req.headers.authorization 
			});
            const data = await this.userBusiness.GetAllUsers(token);

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

	public login = async (req: Request, res: Response) => {
		try{
			const input = LoginSchema.parse(req.body);
			const output = await this.userBusiness.Login(input);

			res.status(200).send(output);
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

	public updateUser = async (req: Request, res: Response) => {
		try{
			const input = UpdateUserSchema.parse({
				id: req.params.id,
				authorization: req.headers.authorization,
				...req.body
			});

			const output = await this.userBusiness.UpdateUser(input);
			res.status(200).send(output);
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

	public deleteUser = async (req: Request, res: Response) => {
		try{
			const input = UpdateUserSchema.parse({
				id: req.params.id,
				authorization: req.headers.authorization,
				...req.body
			});

			const output = await this.userBusiness.DeleteUser(input);
			res.status(200).send(output);
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