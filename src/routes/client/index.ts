import express from "express";
import { ClientController } from "../../controllers/client";
import { ClientBusiness } from "../../business/client";
import { ClientDB } from "../../database/client";
import { TokenManager } from "../../services/tokenManager";
import { HashManager } from "../../services/hashManager";
import { IdGenerator } from "../../services/uuid";

export const client = express.Router();

const controller = new ClientController(
  new ClientBusiness(
    new ClientDB(),
    new TokenManager(),
    new HashManager(),
    new IdGenerator(),
  ),
);

client.post("/signup", controller.Signup);

client.post("/login", controller.Login);

client.put("/update", controller.UpdateClient);

client.delete("/delete", controller.DeleteClient);

client.get("/profile", controller.GetClient);

// ADRESS

client.post("/adress", controller.CreateAdress);

client.put("/adress/:id", controller.UpdateAdress);

client.delete("/adress/:id", controller.DeleteAdress);

//  PAYMENT

client.post("/payment", controller.CreatePayment);

client.delete("/payment/:id", controller.DeletePayment);
