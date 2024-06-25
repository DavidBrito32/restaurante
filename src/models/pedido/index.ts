import { PAYMENTMETHOD } from "../client/paymentCard";
import {
  ORDER_STATUS,
  OrdersDataBase,
  OrdersItemsDB,
} from "../../dto/orders/db";
import { Orders, OrdersItems } from "../../dto/orders";

export class OrdersModel {
  constructor(
    private id: string,
    private clientId: string,
    private deliveryAdress: string,
    private orderStatus: ORDER_STATUS,
    private orderDate: string,
    private completedAt: string | null,
    private notes: string | null,
    private paymentMethod: PAYMENTMETHOD,
    private paymentID: string | null,
    private subTotal: number,
    private products: Array<OrdersItems>,
  ) {}

  public getId(): string {
    return this.id;
  }

  private getClientId(): string {
    return this.clientId;
  }

  private getDeliveryAddress(): string {
    return this.deliveryAdress;
  }

  private getOrderStatus(): ORDER_STATUS {
    return this.orderStatus;
  }

  private getOrderDate(): string {
    return this.orderDate;
  }

  private getCompletedAt(): string | null {
    return this.completedAt;
  }

  private getNotes(): string | null {
    return this.notes;
  }

  private getPaymentMethod(): PAYMENTMETHOD {
    return this.paymentMethod;
  }

  private getPaymentID(): string | null {
    return this.paymentID;
  }

  private getSubTotal(): number {
    return this.subTotal;
  }

  private getOrdersItems = (): Array<OrdersItems> => {
    return this.products;
  };

  /* METHODS */

  public getOrders = (): Orders => {
    return {
      id: this.getId(),
      clientId: this.getClientId(),
      deliveryAdress: this.getDeliveryAddress(),
      orderStatus: this.getOrderStatus(),
      orderDate: this.getOrderDate(),
      completedAt: this.getCompletedAt(),
      notes: this.getNotes(),
      items: this.getOrdersItems(),
      paymentId: this.getPaymentID(),
      paymentMethod: this.getPaymentMethod(),
      subTotal: this.getSubTotal(),
    };
  };

  public insertOrderDB = (): OrdersDataBase => {
    return {
      id: this.getId(),
      client_id: this.getClientId(),
      delivery_address: this.getDeliveryAddress(),
      order_status: this.getOrderStatus(),
      order_date: this.getOrderDate(),
      completed_at: this.getCompletedAt(),
      notes: this.getNotes(),
      payment_id: this.getPaymentID(),
      payment_method: this.getPaymentMethod(),
      sub_total: this.getSubTotal(),
    };
  };

  public insertOrdersItemsDB = (): Array<OrdersItemsDB> => {    
    return this.getOrdersItems().map((item) => {
      const product: OrdersItemsDB = {
        order_id: this.getId(),
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: item.unitPrice,
      };
      return product;
    });
  };
  

  public updateOrderDB = (): Partial<OrdersDataBase> => {
    return {
      client_id: this.getClientId(),
      delivery_address: this.getDeliveryAddress(),
      order_status: this.getOrderStatus(),
      order_date: this.getOrderDate(),
      completed_at: this.getCompletedAt(),
      notes: this.getNotes(),
      payment_id: this.getPaymentID(),
      payment_method: this.getPaymentMethod(),
      sub_total: this.getSubTotal(),
    };
  };
}
