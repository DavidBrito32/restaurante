import { BannersDataBase } from "../../database/banner";
import { BannersInputDTO, BannersOutputDTO, GetBanners } from "../../dto/banners";
import { Unouthorized } from "../../errors/Unouthorized";
import { BannerModel } from "../../models/banners";
import { TokenManager } from "../../services/tokenManager";
import { IdGenerator } from "../../services/uuid";

export class BannersBusiness {
    constructor(
        private readonly bannerDB: BannersDataBase,
        private readonly idManager: IdGenerator,
        private readonly token: TokenManager
    ){}

    public getBanners = async (): Promise<Array<GetBanners>> => {
        const database = await this.bannerDB.getBanners();
        const banners = database.map((banner) => new BannerModel(banner.id, banner.title, banner.sub_title, banner.cta, banner.image_url, banner.created_at, banner.updated_at).getBannerModel());        
        return banners;
    }

    public createBanners = async (input: BannersInputDTO) : Promise<BannersOutputDTO>=> {
        const { authorization, title, subTitle, cta, imageUrl } = input;

        const payload = this.token.getPayload(authorization.split(" ")[1]);

        if(payload === null){
            throw new Unouthorized();
        }
        const id = this.idManager.generate();
        const date = new Date().toDateString();

        const banner = new BannerModel(id, title, subTitle, cta, imageUrl, date, null);

        await this.bannerDB.insertBanner(banner.insertBannerDB());

        return {
            message: "Banner Adicionado com sucesso"
        }
    }
}