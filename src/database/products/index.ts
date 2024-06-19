import { ProductsDB, UpdateProductsDB } from "../../dto/products/db";
import { Db } from "../db";

export class ProductsDatabase extends Db {
  public static TABLE: string = "products";

  public listProducts = async (): Promise<Array<ProductsDB>> => {
    const products: Array<ProductsDB> = await Db.connection(
      ProductsDatabase.TABLE,
    );
    return products;
  };

  public findProductById = async (
    id: string,
  ): Promise<ProductsDB | undefined> => {
    const [products]: Array<ProductsDB> = await Db.connection(
      ProductsDatabase.TABLE,
    )
      .select()
      .where({ id });
    return products;
  };

  public insertProduct = async (input: ProductsDB): Promise<void> => {
    await Db.connection(ProductsDatabase.TABLE).insert(input);
  };

  public updateProduct = async (
    id: string,
    input: UpdateProductsDB,
  ): Promise<void> => {
    await Db.connection(ProductsDatabase.TABLE).update(input).where({ id });
  };

  public deleteProduct = async (id: string): Promise<void> => {
    await Db.connection(ProductsDatabase.TABLE).delete().where({ id });
  };
}
