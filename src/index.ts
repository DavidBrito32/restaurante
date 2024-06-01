import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { users } from "./routes/users";
dotenv.config();

const bootstrap = express();

bootstrap.use(cors());
bootstrap.use(express.json());

bootstrap.use("/users", users);




bootstrap.get("/ping", (req, res) => res.status(200).send("Pong!"));
bootstrap.listen(process.env.SERVER_PORT as string, () => console.log(`server is running at port http://localhost:${process.env.SERVER_PORT}/`));