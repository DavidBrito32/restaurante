import { ClientLoginDB, Client, Client_TableDB, AddressDB, PaymentCardsDB } from "../../dto/client/db";
import { Db } from "../db";

export class ClientDB extends Db {
    public static TABLE_CLIENT: string = "client";
    public static TABLE_ADDRESS: string = "address";
    public static TABLE_PAYMENT: string = "address";

    public insertClient = async (input: Client_TableDB): Promise<void> => {
        await Db.connection(ClientDB.TABLE_CLIENT).insert(input);
    };

    public login = async (input: ClientLoginDB) => {
        const { email } = input;
        await Db.connection(ClientDB.TABLE_CLIENT).where({email});
    };

    public findClientById = async (id: string): Promise<Client> => {
        const [user]: Array<Client_TableDB> = await Db.connection(ClientDB.TABLE_CLIENT).select("*").where({id});
        const address: Array<AddressDB> = await Db.connection(ClientDB.TABLE_CLIENT).select("*").where({id});
        const payment: Array<PaymentCardsDB> = await Db.connection(ClientDB.TABLE_CLIENT).select("*").where({id});

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            address: address,
            payment_card: payment,
            cpf: user.cpf,
            password: user.password
        };
    };

    public findClientByEmail = async (email: string): Promise<Client_TableDB | undefined> => {
        const [user]: Client_TableDB[] | undefined = await Db.connection(ClientDB.TABLE_CLIENT).where({email});
        return user;
    };

    public findClientByCpf = async (cpf: string): Promise<Client_TableDB | undefined> => {
        const [user]: Client_TableDB[] | undefined = await Db.connection(ClientDB.TABLE_CLIENT).where({cpf});
        return user;
    };

}