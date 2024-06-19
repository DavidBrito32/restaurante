import { GetBanners } from "../../dto/banners";
import { InsertBannersDB, UpdateBannersDB } from "../../dto/banners/db";

export class BannerModel {
  constructor(
    private id: string,
    private title: string,
    private subTitle: string,
    private cta: string,
    private imageUrl: string,
    private createdAt: string,
    private updatedAt: string | null,
  ) {}

  public getId = (): string => {
    return this.id;
  };

  public setId = (id: string) => {
    this.id = id;
  };

  public getTitle = (): string => {
    return this.title;
  };

  public setTitle = (title: string) => {
    this.title = title;
  };

  public getSubTitle = (): string => {
    return this.subTitle;
  };

  public setSubTitle = (subTitle: string) => {
    this.subTitle = subTitle;
  };

  public getCta = (): string => {
    return this.cta;
  };

  public setCta = (cta: string) => {
    this.cta = cta;
  };

  public getImageUrl = (): string => {
    return this.imageUrl;
  };

  public setImageUrl = (imageUrl: string) => {
    this.imageUrl = imageUrl;
  };

  public getCreatedAt = (): string => {
    return this.createdAt;
  };

  public setCreatedAt = (createdAt: string) => {
    this.createdAt = createdAt;
  };

  public getUpdatedAt = (): string | null => {
    return this.updatedAt;
  };

  public setUpdatedAt = (updatedAt: string | null) => {
    this.updatedAt = updatedAt;
  };

  public getBannerModel = (): GetBanners => {
    ("");
    return {
      id: this.getId(),
      title: this.getTitle(),
      subTitle: this.getSubTitle(),
      cta: this.getCta(),
      imageUrl: this.getImageUrl(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  };

  public insertBannerDB = (): InsertBannersDB => {
    return {
      id: this.getId(),
      title: this.getTitle(),
      sub_title: this.getSubTitle(),
      image_url: this.getImageUrl(),
      cta: this.getCta(),
      created_at: this.getCreatedAt(),
    };
  };

  public updateBanner = (): UpdateBannersDB => {
    return {
      title: this.getTitle(),
      sub_title: this.getSubTitle(),
      cta: this.getCta(),
      image_url: this.getImageUrl(),
      updated_at: this.getUpdatedAt(),
    };
  };
}
