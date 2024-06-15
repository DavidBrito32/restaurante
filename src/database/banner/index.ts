import { BannersDB, InsertBannersDB } from "../../dto/banners/db";
import { Db } from "../db";

export class BannersDataBase extends Db {
    public static TABLE: string = "banners";

    public getBanners =  async (): Promise<Array<BannersDB>> => {
        const Banners: Array<BannersDB> = await Db.connection(BannersDataBase.TABLE);
        return Banners;
    }

    public insertBanner = async (input: InsertBannersDB): Promise<void> => {
        await Db.connection(BannersDataBase.TABLE).insert(input);
    }

}