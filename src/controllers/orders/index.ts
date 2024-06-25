import { Request, Response } from "express";
import { OrdersBusiness } from "../../business/orders";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../services/HTTP_STATUS_CODE/HTTP_STATUS_CODE";
import { BaseError } from "../../errors/BaseError";
import { GetOrdersSchema, InsertOrderInputDTO, InsertOrderSchema } from "../../dto/orders";

export class OrdersController {
  constructor(private orderBusiness: OrdersBusiness) {}

  public GetOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = GetOrdersSchema.parse({ ...req.headers });
      const output = await this.orderBusiness.getOrders(input);
      res.status(HTTP_STATUS.SUCCESS).send(output);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
      } else if (err instanceof BaseError) {
        res.status(err.statusCode).send(err.message);
      } else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: `erro não tratado: ${err}` });
      }
    }
  };

  public CreateOrder = async (req: Request, res: Response) => {
    try{
      const input: InsertOrderInputDTO = InsertOrderSchema.parse({
        authorization: req.headers.authorization,
        ... req.body
      });

      const output = await this.orderBusiness.insertOrder(input);
      
      res.status(HTTP_STATUS.CREATED).send(output);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(err.issues);
      } else if (err instanceof BaseError) {
        res.status(err.statusCode).send(err.message);
      } else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: `erro não tratado: ${err}` });
      }
    }
  }
}
