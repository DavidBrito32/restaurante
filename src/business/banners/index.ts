import { BannersDataBase } from "../../database/banner";
import {
  BannersInputDTO,
  BannersOutputDTO,
  DeleteBannersInputDTO,
  DeleteBannersOutputDTO,
  GetBanners,
  UpdateBannersInputDTO,
  UpdateBannersOutputDTO,
} from "../../dto/banners";
import { BadRequest } from "../../errors/BadRequest";
import { NotFound } from "../../errors/NotFound";
import { Unouthorized } from "../../errors/Unouthorized";
import { BannerModel } from "../../models/banners";
import { ROLE, TokenManager } from "../../services/tokenManager";
import { IdGenerator } from "../../services/uuid";

export class BannersBusiness {
  constructor(
    private readonly bannerDB: BannersDataBase,
    private readonly idManager: IdGenerator,
    private readonly token: TokenManager,
  ) {}

  public getBanners = async (): Promise<Array<GetBanners>> => {
    const database = await this.bannerDB.getBanners();
    const banners = database.map((banner) =>
      new BannerModel(
        banner.id,
        banner.title,
        banner.sub_title,
        banner.cta,
        banner.image_url,
        banner.created_at,
        banner.updated_at,
      ).getBannerModel(),
    );
    return banners;
  };

  public createBanners = async (
    input: BannersInputDTO,
  ): Promise<BannersOutputDTO> => {
    const { authorization, title, subTitle, cta, imageUrl } = input;

    const payload = this.token.getPayload(authorization.split(" ")[1]);

    if (
      payload === null ||
      (payload.role !== ROLE.ADMIN && payload.role !== ROLE.OPERADOR)
    ) {
      throw new Unouthorized();
    }
    const id = this.idManager.generate();
    const date = new Date().toISOString();

    const banner = new BannerModel(
      id,
      title,
      subTitle,
      cta,
      imageUrl,
      date,
      null,
    );

    await this.bannerDB.insertBanner(banner.insertBannerDB());

    return {
      message: "Banner Adicionado com sucesso",
    };
  };

  public updateBanners = async (
    input: UpdateBannersInputDTO,
  ): Promise<UpdateBannersOutputDTO> => {
    const { authorization, cta, imageUrl, subTitle, title, id } = input;
    const payload = this.token.getPayload(authorization.split(" ")[1]);

    if (
      payload === null ||
      (payload.role !== ROLE.ADMIN && payload.role !== ROLE.OPERADOR)
    ) {
      throw new Unouthorized();
    }

    if (!cta && !imageUrl && !subTitle && !title) {
      throw new BadRequest("Passar pelo menos um dado para atualização");
    }

    const [exists] = await this.bannerDB.findBannerByID(id);
    console.log(exists);

    if (!exists) {
      throw new NotFound("Banner não encontrado");
    }

    const updatedAt = new Date().toISOString();

    const Banners = new BannerModel(
      exists.id,
      title || exists.title,
      subTitle || exists.sub_title,
      cta || exists.cta,
      imageUrl || exists.image_url,
      exists.created_at,
      updatedAt,
    );

    await this.bannerDB.updateBanner(id, Banners.updateBanner());

    return {
      message: "Banner Atualizado com sucesso",
    };
  };

  public deleteBanner = async (
    input: DeleteBannersInputDTO,
  ): Promise<DeleteBannersOutputDTO> => {
    const { authorization, id } = input;
    const payload = this.token.getPayload(authorization.split(" ")[1]);

    if (
      payload === null ||
      (payload.role !== ROLE.ADMIN && payload.role !== ROLE.OPERADOR)
    ) {
      throw new Unouthorized();
    }

    const [exists] = await this.bannerDB.findBannerByID(id);

    if (!exists) {
      throw new NotFound();
    }

    const Banner = new BannerModel(
      exists.id,
      exists.title,
      exists.sub_title,
      exists.cta,
      exists.image_url,
      exists.created_at,
      exists.updated_at,
    );

    await this.bannerDB.removeBanner(Banner.getId());

    return { message: "Banner deletado com sucesso!" };
  };
}
