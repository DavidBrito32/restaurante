import { Request, Response } from "express";
import { UsersBusiness } from "../../business/users";
import { BaseError } from "../../errors/BaseError";
import { ZodError } from "zod";
import {
  GetUserSchema,
  InputUserDTO,
  InsertUserSchema,
  LoginSchema,
  LogoffSchema,
  UpdateUserSchema,
} from "../../dto/users";
import { HTTP_STATUS } from "../../services/HTTP_STATUS_CODE/HTTP_STATUS_CODE";

export class UserController {
  constructor(private readonly userBusiness: UsersBusiness) {}

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const token = GetUserSchema.parse({
        authorization: req.headers.authorization,
      });
      const data = await this.userBusiness.GetAllUsers(token);

      res.status(HTTP_STATUS.SUCCESS).send(data);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
      } else if (err instanceof BaseError) {
        res.status(err.statusCode).send(err.message);
      } else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send(`Erro não tratado: DESC: ${err}`);
      }
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const data: InputUserDTO = InsertUserSchema.parse({
        authorization: req.headers.authorization,
        ...req.body,
      });

      res
        .status(HTTP_STATUS.CREATED)
        .send(await this.userBusiness.CreateUser(data));
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
      } else if (err instanceof BaseError) {
        res.status(err.statusCode).send(err.message);
      } else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send(`Erro não tratado: DESC: ${err}`);
      }
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input = LoginSchema.parse(req.body);
      const output = await this.userBusiness.Login(input);

      res.status(HTTP_STATUS.SUCCESS).send(output);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
      } else if (err instanceof BaseError) {
        res.status(err.statusCode).send(err.message);
      } else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send(`Erro não tratado: DESC: ${err}`);
      }
    }
  };

  public logof = async (req: Request, res: Response) => {
    try {
      const input = LogoffSchema.parse(req.headers);
      const output = await this.userBusiness.Logoff(input);

      res.status(HTTP_STATUS.SUCCESS).send(output);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
      } else if (err instanceof BaseError) {
        res.status(err.statusCode).send(err.message);
      } else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send(`Erro não tratado: DESC: ${err}`);
      }
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    try {
      const input = UpdateUserSchema.parse({
        id: req.params.id,
        authorization: req.headers.authorization,
        ...req.body,
      });

      const output = await this.userBusiness.UpdateUser(input);
      res.status(HTTP_STATUS.SUCCESS).send(output);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
      } else if (err instanceof BaseError) {
        res.status(err.statusCode).send(err.message);
      } else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send(`Erro não tratado: DESC: ${err}`);
      }
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const input = UpdateUserSchema.parse({
        id: req.params.id,
        authorization: req.headers.authorization,
        ...req.body,
      });

      const output = await this.userBusiness.DeleteUser(input);
      res.status(HTTP_STATUS.SUCCESS).send(output);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
      } else if (err instanceof BaseError) {
        res.status(err.statusCode).send(err.message);
      } else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send(`Erro não tratado: DESC: ${err}`);
      }
    }
  };
}
