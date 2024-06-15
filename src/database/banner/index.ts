import { BannersDB, InsertBannersDB, UpdateBannersDB } from "../../dto/banners/db";
import { Db } from "../db";

export class BannersDataBase extends Db {
    public static TABLE: string = "banners";

    public getBanners =  async (): Promise<Array<BannersDB>> => {
        const Banners: Array<BannersDB> = await Db.connection(BannersDataBase.TABLE);
        return Banners;
    }

    public findBannerByID = async (id: string): Promise<Array<BannersDB>> => {
        const banners: Array<BannersDB> = await Db.connection(BannersDataBase.TABLE).select().where({ id });
        return banners;
    }

    public insertBanner = async (input: InsertBannersDB): Promise<void> => {
        await Db.connection(BannersDataBase.TABLE).insert(input);
    }

    public updateBanner = async (id: string, input: UpdateBannersDB): Promise<void> => {
        await Db.connection(BannersDataBase.TABLE).update(input).where({ id });
    }

    public removeBanner = async (id: string): Promise<void> => {
        await Db.connection(BannersDataBase.TABLE).delete().where({ id });
    }

}