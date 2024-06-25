import { OrdersDB } from "../../database/orders";
import {
  GetOrdersInputDTO,
  GetOrdersOutputDTO,
  InsertOrderInputDTO,
  InsertOrderOutputDTO,
  OrdersItems,
} from "../../dto/orders";
import { ORDER_STATUS } from "../../dto/orders/db";
import { BadRequest } from "../../errors/BadRequest";
import { OrdersModel } from "../../models/pedido";
import { TokenManager } from "../../services/tokenManager";
import { IdGenerator } from "../../services/uuid";

export class OrdersBusiness {
  constructor(
    private DB: OrdersDB,
    private token: TokenManager,
    private ID: IdGenerator
  ) { }

  public getOrders = async (
    input: GetOrdersInputDTO,
  ): Promise<GetOrdersOutputDTO> => {
    const { authorization } = input;
    const payload = this.token.getPayload(authorization.split(" ")[1]);

    if (payload === null) {
      throw new BadRequest("Você não tem permissão para acessar este recurso");
    }

    const orders = await this.DB.getOrdersByClientId(payload.id);

    const itemsOrders: Array<OrdersItems> = orders.flatMap((order) => {
      return order.items.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        orderId: order.id, // Supondo que `order_id` esteja no nível do pedido e não no item
      }));
    });

    const Orders = orders.map((order) =>
      new OrdersModel(
        order.id,
        order.client_id,
        order.delivery_address,
        order.order_status,
        order.order_date,
        order.completed_at,
        order.notes,
        order.payment_method,
        order.payment_id,
        order.sub_total,
        itemsOrders,
      ).getOrders(),
    );

    return {
      message: "Listagem de pedidos",
      orders: Orders,
    };
  };

  public insertOrder = async (input: InsertOrderInputDTO): Promise<InsertOrderOutputDTO> => {
    const { authorization, paymentId, paymentMethod, items, deliveryAdress, notes, subTotal } = input;

    const payload = this.token.getPayload(authorization.split(" ")[1]);

    if (payload === null) {
      throw new BadRequest("Você não tem permissão para acessar este recurso");
    }

    const OrderId = this.ID.generate();

    const newOrder = new OrdersModel(OrderId, payload.id, deliveryAdress, ORDER_STATUS.PROCESSAMENTO, new Date().toISOString(), null, notes, paymentMethod, paymentId, subTotal, items);

    console.log(newOrder.insertOrdersItemsDB());

    await this.DB.insertOrder(newOrder.insertOrderDB());

    for(const itens of newOrder.insertOrdersItemsDB()){
      await this.DB.insertItemsOrder(itens);
    }

  //  const promisses = newOrder.insertOrdersItemsDB().map(async (itens) => {
  //     await this.DB.insertItemsOrder(itens);
  //   })

  //   await Promise.all(promisses);


    return {
      message: "Pedido inserido com sucesso"
    }
  };
}
