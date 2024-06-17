import { ProductsDatabase } from "../../database/products";
import { GetProducts, ProductsDeleteInputDTO, ProductsDeleteOutputDTO, ProductsInputDTO, ProductsOutputDTO, ProductsUpdateInputDTO, ProductsUpdateOutputDTO } from "../../dto/products";
import { BadRequest } from "../../errors/BadRequest";
import { Unouthorized } from "../../errors/Unouthorized";
import { ProductModel } from "../../models/products";
import { ROLE, TokenManager } from "../../services/tokenManager";
import { IdGenerator } from "../../services/uuid";

export class ProductBusiness {
    constructor(
        private readonly productDB: ProductsDatabase,
        private readonly idManager: IdGenerator,
        private readonly tokenManager: TokenManager
    ){}

    public getProducts = async (): Promise<Array<GetProducts>> => {
        const lista = await this.productDB.listProducts();
        const products: Array<GetProducts> = lista.map((product) => new ProductModel(product.id, product.title, product.description, product.image_url, product.price, product.discount, product.created_at, product.updated_at).listProduct());
        return products;
    }

    public createProduct = async (input: ProductsInputDTO): Promise<ProductsOutputDTO> => {
        const { authorization, title, description, price, discount, imageUrl } = input;

        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);

        if (payload === null || (payload.role !== ROLE.ADMIN && payload.role !== ROLE.OPERADOR)) {
            throw new Unouthorized();
        };

        const id = this.idManager.generate();
        const createdAt = new Date().toISOString();
        const PRODUCT = new ProductModel(id, title, description, imageUrl, price, discount || null, createdAt, null);

        await this.productDB.insertProduct(PRODUCT.insertProduct());
        return {
            message: "Produto adicionado com sucesso!"
        }
    }

    public updateProduct = async (input: ProductsUpdateInputDTO): Promise<ProductsUpdateOutputDTO> => {
        const { authorization, id, title, description, price, discount, imageUrl } = input;
        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);

        if (payload === null || (payload.role !== ROLE.ADMIN && payload.role !== ROLE.OPERADOR)) {
            throw new Unouthorized();
        };

        const exists = await this.productDB.findProductById(id);

        if(!exists){
            throw new BadRequest("produto não encontrado");
        }

        if(!title && !description && !price && !discount && !imageUrl){
            throw new BadRequest("Informar ao menos um dado para atualização")
        }        

        const product = new ProductModel(exists.id, title || exists.title, description || exists.description, imageUrl || exists.image_url, price || exists.price, discount || exists.discount, exists.created_at, new Date().toISOString());

        await this.productDB.updateProduct(exists.id, product.updateProduct());

        return {
            message: "Produto atualizado com sucesso! ✅"
        }
    }

    public deleteProduct = async (input: ProductsDeleteInputDTO): Promise<ProductsDeleteOutputDTO> => {
        const { authorization, id } = input;
        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);

        if (payload === null || (payload.role !== ROLE.ADMIN && payload.role !== ROLE.OPERADOR)) {
            throw new Unouthorized();
        };

        const exists = await this.productDB.findProductById(id);

        if(!exists){
            throw new BadRequest("produto não encontrado");
        }

        await this.productDB.deleteProduct(exists.id);


        return { 
            message: "Produto Deletado com sucesso!"
        }


    }
}