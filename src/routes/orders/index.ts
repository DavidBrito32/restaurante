import Express from "express";
import { OrdersController } from "../../controllers/orders";
import { OrdersBusiness } from "../../business/orders";
import { OrdersDB } from "../../database/orders";
import { TokenManager } from "../../services/tokenManager";
import { IdGenerator } from "../../services/uuid";

export const Orders = Express.Router();
const controller = new OrdersController(
  new OrdersBusiness(new OrdersDB(), new TokenManager(), new IdGenerator()),
);

Orders.get("/", controller.GetOrders);

Orders.post("/", controller.CreateOrder);
