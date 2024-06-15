import Express from "express";
import { BannersController } from "../../controllers/banners";
import { BannersBusiness } from "../../business/banners";
import { BannersDataBase } from "../../database/banner";
import { IdGenerator } from "../../services/uuid";
import { TokenManager } from "../../services/tokenManager";

export const Banner = Express.Router();

const controller = new BannersController(new BannersBusiness(new BannersDataBase(), new IdGenerator(), new TokenManager()));

Banner.get("/", controller.GetBanners);

Banner.post("/", controller.CreateBanner);

Banner.put("/:id", controller.UpdateBanner);

Banner.delete("/:id", controller.DeleteBanner);