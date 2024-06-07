import express from "express";
import { UserController } from "../../controllers/users";
import { UsersBusiness } from "../../business/users";
import { TokenManager } from "../../services/tokenManager";
import { UserDataBase } from "../../database/users";
import { HashManager } from "../../services/hashManager";
import { IdGenerator } from "../../services/uuid";

export const users = express.Router();
const controller = new UserController(new UsersBusiness(new UserDataBase(), new TokenManager(), new HashManager(), new IdGenerator()));

users.get("/", controller.getAllUsers);

users.post("/", controller.createUser);

users.post("/login", controller.login);

users.post("/logof", controller.logof);

users.put("/update/:id", controller.updateUser);

users.delete("/:id", controller.deleteUser);