import {
  OrdersCompleteDB,
  OrdersDataBase,
  OrdersItemsDB,
} from "../../dto/orders/db";
import { Db } from "../db";

export class OrdersDB extends Db {
  public static TABLE_ORDER: string = "orders";
  public static TABLE_ITEMS: string = "orders_items";

  public getOrdersByClientId = async (
    client_id: string,
  ): Promise<Array<OrdersCompleteDB>> => {
    const orders: Array<OrdersDataBase> = await Db.connection(
      OrdersDB.TABLE_ORDER,
    )
      .select("*")
      .where({ client_id });

    const completeOrders: Array<OrdersCompleteDB> = await Promise.all(
      orders.map(async (order) => {
        const items: Array<OrdersItemsDB> = await Db.connection(
          OrdersDB.TABLE_ITEMS,
        )
          .select("*")
          .where({ order_id: order.id });

        return {
          ...order,
          items: items,
        };
      }),
    );

    return completeOrders;
  };

  public insertOrder = async (input: OrdersDataBase): Promise<void> => {
    await Db.connection(OrdersDB.TABLE_ORDER).insert(input);
  };

  public insertItemsOrder = async (input: OrdersItemsDB): Promise<void> => {
    await Db.connection(OrdersDB.TABLE_ITEMS).insert(input);
  }
}
