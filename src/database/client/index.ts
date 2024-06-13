import { GetPaymentClientDB } from "../../dto/client";
import { ClientLoginDB, Client, Client_TableDB, AddressDB, PaymentCardsDB, updateClientDB, InsertAdressClientDB, UpdateAdressClientDB, GetAllAdress, InsertPaymentDB } from "../../dto/client/db";
import { Db } from "../db";

export class ClientDB extends Db {
    public static TABLE_CLIENT: string = "client";
    public static TABLE_ADDRESS: string = "address";
    public static TABLE_PAYMENT: string = "payment_cards";

    public insertClient = async (input: Client_TableDB): Promise<void> => {
        await Db.connection(ClientDB.TABLE_CLIENT).insert(input);
    };

    public login = async (input: ClientLoginDB) => {
        const { email } = input;
        await Db.connection(ClientDB.TABLE_CLIENT).where({email});
    };

    public findClientById = async (id: string): Promise<Client_TableDB | undefined> => {
        const [user]: Array<Client_TableDB> = await Db.connection(ClientDB.TABLE_CLIENT).select("*").where({id});
       return user;
    };

    public findClientCompleteById = async (id: string): Promise<Client | undefined> => {
        const [user]: Array<Client_TableDB> = await Db.connection(ClientDB.TABLE_CLIENT).select("*").where({id});
        const address: Array<AddressDB> = await Db.connection(ClientDB.TABLE_ADDRESS).select("*").where({client_id: id});
        const payment: Array<PaymentCardsDB> = await Db.connection(ClientDB.TABLE_PAYMENT).select("*").where({client_id: id});

        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            address: address,
            payment_card: payment,
            cpf: user.cpf,
            password: user.password,
            date_of_birth: user.date_of_birth
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

    public updateClient = async (id: string, input: updateClientDB): Promise<void> => {
        await Db.connection(ClientDB.TABLE_CLIENT).update(input).where({id});
    };

    public removeClient = async (id: string): Promise<void> => {
        await Db.connection(ClientDB.TABLE_CLIENT).delete().where({id});
    };

    // ADRESS
    public listAdress = async (client_id: string): Promise<Array<GetAllAdress>> => {
        const address: Array<GetAllAdress> = await Db.connection(ClientDB.TABLE_ADDRESS).where({
            client_id
        });
        
        return address;
    }

    public findAdressById = async (id: string): Promise<Array<GetAllAdress | undefined>> => {
        const adress: Array<GetAllAdress | undefined > = await Db.connection(ClientDB.TABLE_ADDRESS).select("*").where({id});
        return adress;
    }

    public findAdressByStreet = async (street: string): Promise<Array<GetAllAdress | undefined>> => {
        const adress: Array<GetAllAdress | undefined > = await Db.connection(ClientDB.TABLE_ADDRESS).select("*").where("street", "like", `%${street}%`);
        return adress;
    }

    public insertAdress = async (input: InsertAdressClientDB): Promise<void> => {
        await Db.connection(ClientDB.TABLE_ADDRESS).insert(input);
    }

    public updateAdress = async (id: string ,input: UpdateAdressClientDB): Promise<void> => {
        await Db.connection(ClientDB.TABLE_ADDRESS).update(input).where({id});
    }

    public removeAdress = async (id: string): Promise<void> => {
        await Db.connection(ClientDB.TABLE_ADDRESS).delete().where({id});
    }

    // PAYMENT METHODS

    public findPaymentMethodByNumberCard = async (number_card: number): Promise<GetPaymentClientDB | undefined> => {
        const [paymentByNumberCard]: Array<GetPaymentClientDB> = await Db.connection(ClientDB.TABLE_PAYMENT).select().where({number_card});

        return paymentByNumberCard;
    }

    public findPaymentMethodById = async (id: string): Promise<GetPaymentClientDB | undefined> => {
        const [paymentById]: Array<GetPaymentClientDB> = await Db.connection(ClientDB.TABLE_PAYMENT).select().where({ id });

        return paymentById;
    }

    public insertPaymentCard = async (input: InsertPaymentDB): Promise<void> => {
        await Db.connection(ClientDB.TABLE_PAYMENT).insert(input);;
    }

    public removePaymentCard = async (id: string): Promise<void> => {
        await Db.connection(ClientDB.TABLE_PAYMENT).delete().where({ id });
    }

}