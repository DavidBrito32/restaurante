import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { users } from "./routes/users";
import { client } from "./routes/client";
dotenv.config();

const bootstrap = express();


bootstrap.use(cors());
bootstrap.use(express.json());

//USUARIO DASHBOARD
bootstrap.use("/users", users);

//CLIENT
bootstrap.use("/client", client);



bootstrap.get("/ping", (req, res) => res.status(200).send("Pong!"));
bootstrap.listen(process.env.SERVER_PORT as string, () => console.log(`server is running at port http://localhost:${process.env.SERVER_PORT}/`));