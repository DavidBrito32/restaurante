import express from "express";
import { ClientController } from "../../controllers/client";
import { ClientBusiness } from "../../business/client";
import { ClientDB } from "../../database/client";
import { TokenManager } from "../../services/tokenManager";
import { HashManager } from "../../services/hashManager";
import { IdGenerator } from "../../services/uuid";

export const client = express.Router();
const controller = new ClientController(new ClientBusiness(new ClientDB(), new TokenManager(), new HashManager(), new IdGenerator()));


client.post("/signup", controller.Signup);

client.post("/login", controller.Login);

client.put("/update", controller.UpdateClient);

client.delete("/delete", controller.DeleteClient);
