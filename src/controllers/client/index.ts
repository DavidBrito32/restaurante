import { ZodError } from "zod";
import { ClientBusiness } from "../../business/client";
import { Request, Response } from "express";
import { BaseError } from "../../errors/BaseError";
import { LoginClientSchema, SignupClientInputDTO, SignupClientOutputDTO, SignupClientSchema } from "../../dto/client";

export class ClientController {
    constructor(
        private readonly clientBusiness: ClientBusiness
    ){}
    
    public Signup = async (req: Request, res: Response): Promise<void> => {
        try{
            const input: SignupClientInputDTO = SignupClientSchema.parse({...req.body});
            const output: SignupClientOutputDTO = await this.clientBusiness.signup(input);
            res.status(201).send(output)
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

    public Login = async (req: Request, res: Response): Promise<void> => {
        try{
            const input = LoginClientSchema.parse({...req.body});
            const output = await this.clientBusiness.login(input);
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