import { ZodError } from "zod";
import { ClientBusiness } from "../../business/client";
import { Request, Response } from "express";
import { BaseError } from "../../errors/BaseError";
import { DeleteAdressClientSchema, DeletePaymentSchema, FindClientSchema, InsertAdressClientSchema, InsertPaymentSchema, LoginClientSchema, SignupClientInputDTO, SignupClientOutputDTO, SignupClientSchema, UpdateAdressClientSchema, deleteClientSchema, updateClientSchema } from "../../dto/client";
import { HTTP_STATUS } from "../../services/HTTP_STATUS_CODE/HTTP_STATUS_CODE";


export class ClientController {
    constructor(
        private readonly clientBusiness: ClientBusiness
    ) { }

    public Signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: SignupClientInputDTO = SignupClientSchema.parse({
                ...req.body
             });
            const output: SignupClientOutputDTO = await this.clientBusiness.signup(input);
            res.status(HTTP_STATUS.CREATED).send(output)
        } catch (err) {            
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

    public Login = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = LoginClientSchema.parse({ ...req.body });
            const output = await this.clientBusiness.login(input);
            res.status(HTTP_STATUS.SUCCESS).send(output);
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public UpdateClient = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = updateClientSchema.parse({
                authorization: req.headers.authorization,
                ...req.body
            });

            const output = await this.clientBusiness.updateClient(input);
            res.status(HTTP_STATUS.SUCCESS).send(output);
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public GetClient = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = FindClientSchema.parse({ ...req.headers });
            const output = await this.clientBusiness.findClient(input);
            res.status(HTTP_STATUS.SUCCESS).send(output);
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message)
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public DeleteClient = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = deleteClientSchema.parse({ ...req.headers });
            const output = await this.clientBusiness.deleteClient(input);
            res.status(HTTP_STATUS.SUCCESS).send(output);
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    // ADRESS

    public CreateAdress = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = InsertAdressClientSchema.parse({
                authorization: req.headers.authorization,
                ...req.body
            });

            const output = await this.clientBusiness.createAdress(input);

            res.status(HTTP_STATUS.CREATED).send(output);
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public UpdateAdress = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = UpdateAdressClientSchema.parse({
                authorization: req.headers.authorization,
                id: req.params.id,
                ...req.body
            });

            const output = await this.clientBusiness.updateAdress(input);
            res.status(HTTP_STATUS.SUCCESS).send(output);
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public DeleteAdress = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = DeleteAdressClientSchema.parse({
                authorization: req.headers.authorization,
                id: req.params.id,
            });

            const output = await this.clientBusiness.deleteAdress(input);
            res.status(HTTP_STATUS.SUCCESS).send(output);
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    // PAYMENT

    public CreatePayment = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = InsertPaymentSchema.parse({
                authorization: req.headers.authorization,
                ...req.body
            });

            const output = await this.clientBusiness.createPaymentCard(input);

            res.status(HTTP_STATUS.CREATED).send(output);
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }

    public DeletePayment = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = DeletePaymentSchema.parse({
                authorization: req.headers.authorization,
                id: req.params.id
            });

            const output = await this.clientBusiness.deletePaymentCard(input);

            res.status(HTTP_STATUS.SUCCESS).send(output);
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
            } else if (err instanceof BaseError) {
                res.status(err.statusCode).send(err.message);
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Erro não tratado",
                    descricao: err
                });
            }
        }
    }
}