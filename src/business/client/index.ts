import { ClientDB } from "../../database/client";
import { AddresClient, DeleteAdressClientInputDTO, DeleteAdressClientOutputDTO, DeletePaymentInputDTO, DeletePaymentOutputDTO, FindClientInputDTO, GetClientOutPutDTO, GetPaymentClient, InsertAdressClientInputDTO, InsertAdressClientOutputDTO, InsertPaymentInputDTO, InsertPaymentOutputDTO, LoginClientInputDTO, LoginClientOutputDTO, SignupClientInputDTO, SignupClientOutputDTO, UpdateAdressClientInputDTO, UpdateAdressClientOutputDTO, deleteClientInputDTO, deleteClientOutputDTO, updateClient, updateClientOutputDTO } from "../../dto/client";
import { BadRequest } from "../../errors/BadRequest";
import { NotFound } from "../../errors/NotFound";
import { Unouthorized } from "../../errors/Unouthorized";
import { ClientModel } from "../../models/client";
import { AddressModel } from "../../models/client/address";
import { PaymentModel } from "../../models/client/paymentCard";
import { HashManager } from "../../services/hashManager";
import { TokenManager, TokenPayload } from "../../services/tokenManager";
import { IdGenerator } from "../../services/uuid";

export class ClientBusiness {
    constructor(
        private readonly clientDb: ClientDB,
        private readonly tokenManager: TokenManager,
        private readonly hashManager: HashManager,
        private readonly idManager: IdGenerator
    ) { }

    public signup = async (input: SignupClientInputDTO): Promise<SignupClientOutputDTO> => {
        const { name, email, cpf, password, dateOfBirth, avatar } = input;
        const exists = await this.clientDb.findClientByEmail(email);
        const cpfExists = await this.clientDb.findClientByCpf(cpf);

        if (exists || cpfExists) {
            throw new BadRequest("Desculpe, verifique os dados informados e tente novamente!");
        }

        const id = this.idManager.generate();
        const hashedPassword = await this.hashManager.hash(password);

        const client = new ClientModel(id, name, email, avatar !== undefined ? avatar : null, hashedPassword, cpf, dateOfBirth).insertClientDB();

        await this.clientDb.insertClient(client);

        return { message: "Cliente Cadastrado com sucesso" };
    };

    public login = async (input: LoginClientInputDTO): Promise<LoginClientOutputDTO> => {
        const { email, password } = input;
        const exists = await this.clientDb.findClientByEmail(email);

        if (!exists) {
            throw new BadRequest("'cliente' - não encontrado - sugestão faça o signup");
        }
        const hashIsValid = await this.hashManager.compare(password, exists.password);

        if (!hashIsValid) {
            throw new BadRequest();
        }

        const payload: TokenPayload = {
            id: exists.id,
            name: exists.name,
            email: exists.email,
            role: exists.role
        }

        const token = this.tokenManager.createToken(payload);

        return { message: `Seja bem vindo ${payload.name}`, token };
    };

    public findClient = async (input: FindClientInputDTO): Promise<GetClientOutPutDTO> => {
        const { authorization } = input;
        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);

        if (payload === null) {
            throw new Unouthorized();
        }

        const exists = await this.clientDb.findClientCompleteById(payload.id);


        if (!exists) {
            throw new NotFound()
        }

        const client = new ClientModel(exists.id, exists.name, exists.email, exists.avatar, exists.password, exists.cpf, exists.date_of_birth).getClient();

        const address: Array<AddresClient> = exists.address.map((endereco) => new AddressModel(endereco.id, endereco.client_id, endereco.street, endereco.house_number, endereco.complement, endereco.district, endereco.city, endereco.state, endereco.primary_adress, endereco.zip_code).getAddress());

        const payment: Array<GetPaymentClient> = exists.payment_card.map((payment) => new PaymentModel(payment.id, payment.client_id, payment.number_card, payment.client_name, payment.method, payment.expires_in, payment.created_at, payment.cvv).getPayment());

        const output: GetClientOutPutDTO = {
            id: client.id,
            name: client.name,
            avatar: client.avatar,
            email: client.email,
            dateOfBirth: client.date_of_birth,
            address: address,
            savedPayments: payment,
        }

        return output;

    };

    public updateClient = async (input: updateClient): Promise<updateClientOutputDTO> => {
        const { authorization, name, dateOfBirth, email, password, avatar } = input;

        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);

        if (payload === null) {
            throw new Unouthorized();
        }

        const exists = await this.clientDb.findClientById(payload.id);


        if (!exists) {
            throw new BadRequest("Cliente não encontrado");
        }

        if (!name && !email && !password) {
            throw new BadRequest("Enviar ao menos um dado");
        }

        let HashedPassword: string | undefined;
        if (password) {
            HashedPassword = await this.hashManager.hash(password);
        }

        const newClient = new ClientModel(exists.id, name || exists.name, email || exists.email, avatar || exists.avatar, HashedPassword || exists.password, exists.cpf, dateOfBirth || exists.date_of_birth).updateClientDB();

        await this.clientDb.updateClient(newClient.id, newClient);

        return {
            message: "dados atualizados com sucesso!"
        }
    };

    public deleteClient = async (input: deleteClientInputDTO): Promise<deleteClientOutputDTO> => {
        const { authorization } = input;
        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);
        if (payload === null) {
            throw new Unouthorized();
        }

        const exists = await this.clientDb.findClientById(payload.id);

        if (!exists) {
            throw new BadRequest("Cliente não encontrado");
        }

        await this.clientDb.removeClient(exists.id);

        return {
            message: "Sentimos muito que você tenha chegado a este ponto, Porem continuaremos aqui torcendo por você"
        }
    };

    //ADDRESS

    public createAdress = async (input: InsertAdressClientInputDTO): Promise<InsertAdressClientOutputDTO> => {
        const { authorization, street, houseNumber, district, complement, city, state, zipCode } = input;
        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);
        if (payload === null) {
            throw new Unouthorized();
        }

        const [adressAlReadyExists] = await this.clientDb.findAdressByStreet(street);
        if (adressAlReadyExists) {
            throw new BadRequest("'adress' - endereço ja registrado");
        }

        const id = this.idManager.generate();
        const complemento: string | null = complement === undefined ? null : complement;

        const Adress = new AddressModel(id, payload.id, street, houseNumber, complemento, district, city, state, false, zipCode).insertAdressDB();

        await this.clientDb.insertAdress(Adress);

        return {
            message: "Endereço Adicionado com sucesso!!"
        }

    }

    public updateAdress = async (input: UpdateAdressClientInputDTO): Promise<UpdateAdressClientOutputDTO> => {
        const { authorization, id, street, complement, houseNumber, city, district, zipCode, state, primaryAdress } = input;
        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);
        if (payload === null) {
            throw new Unouthorized();
        }

        if (!street && !complement && !houseNumber && !city && !district && !zipCode && !primaryAdress) {
            throw new BadRequest("'Atenção' - Informar ao menos um dado para atualização")
        }

        const [adressAlReadyExists] = await this.clientDb.findAdressById(id);

        if (!adressAlReadyExists) {
            throw new BadRequest("'adress' - endereço não existe");
        }

        const ADRESS = new AddressModel(adressAlReadyExists.id, adressAlReadyExists.client_id, street || adressAlReadyExists.street, houseNumber || adressAlReadyExists.house_number, complement || adressAlReadyExists.complement, district || adressAlReadyExists.district, city || adressAlReadyExists.city, state || adressAlReadyExists.state, primaryAdress || adressAlReadyExists.primary_adress, zipCode || adressAlReadyExists.zip_code).updateAdressDB();

        await this.clientDb.updateAdress(id, ADRESS);

        return {
            message: "Endereço Atualizado com sucesso"
        }
    }

    public deleteAdress = async (input: DeleteAdressClientInputDTO): Promise<DeleteAdressClientOutputDTO> => {
        const { authorization, id } = input;
        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);
        if (payload === null) {
            throw new Unouthorized();
        }

        const [Adress] = await this.clientDb.findAdressById(id);
        if (!Adress) {
            throw new NotFound();
        }

        await this.clientDb.removeAdress(id);

        return {
            message: "Endereço removido com sucesso!"
        }
    }

    //CREDIT CARD

    public createPaymentCard = async (input: InsertPaymentInputDTO): Promise<InsertPaymentOutputDTO> => {
        const { authorization, clientName, cvv, expiresIn, method, numberCard } = input;
        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);
        if (payload === null) {
            throw new Unouthorized();
        }

        const exists = await this.clientDb.findClientCompleteById(payload.id);

        if (!exists) {
            throw new NotFound("'client' - cliente não encontrado");
        }

        const cardAllReadyExistis = await this.clientDb.findPaymentMethodByNumberCard(numberCard);

        if (cardAllReadyExistis) {
            throw new BadRequest();
        }

        const ID = this.idManager.generate();
        const createdAt = new Date().toISOString();

        const payment = new PaymentModel(ID, payload.id, numberCard, clientName, method, expiresIn, createdAt, cvv);

        await this.clientDb.insertPaymentCard(payment.insertPaymentDB());


        return {
            message: "Cartão Adicionado com sucesso !"
        }


    }

    public deletePaymentCard = async (input: DeletePaymentInputDTO): Promise<DeletePaymentOutputDTO> => {
        const { authorization, id } = input;
        const payload = this.tokenManager.getPayload(authorization.split(" ")[1]);
        if (payload === null) {
            throw new Unouthorized();
        }

        const exists = await this.clientDb.findClientCompleteById(payload.id);

        if (!exists) {
            throw new NotFound("'client' - cliente não encontrado");
        }

        const cardMethod = await this.clientDb.findPaymentMethodById(id);

        if (!cardMethod) {
            throw new NotFound("'card' - não encontrado");
        }

        const Card = new PaymentModel(cardMethod.id, cardMethod.client_id, cardMethod.number_card, cardMethod.client_name, cardMethod.method, cardMethod.expires_in, cardMethod.created_at, cardMethod.cvv)


        await this.clientDb.removePaymentCard(Card.getId());

        return {
            message: "Metodo de Pagamento Removido com Sucesso"
        }

    }
}