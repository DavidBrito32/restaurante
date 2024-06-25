import { PAYMENTMETHOD } from "../../../models/client/paymentCard";

export enum ORDER_STATUS {
  PROCESSAMENTO = "PROCESSAMENTO",
  EM_PREPARO = "PREPARANDO",
  SAINDO_PARA_ENTREGA = "ENTREGA",
  CONCLUIDO = "CONCLUIDO",
}

export interface OrdersDataBase {
  id: string;
  client_id: string;
  delivery_address: string;
  order_status: ORDER_STATUS;
  order_date: string;
  completed_at: string | null;
  notes: string | null;
  payment_method: PAYMENTMETHOD;
  payment_id: string | null;
  sub_total: number;
}

export interface OrdersItemsDB {
  product_id: string;
  order_id: string;
  quantity: number;
  unit_price: number;
}

export interface OrdersCompleteDB {
  id: string;
  client_id: string;
  delivery_address: string;
  order_status: ORDER_STATUS;
  order_date: string;
  completed_at: string | null;
  notes: string | null;
  payment_method: PAYMENTMETHOD;
  items: Array<OrdersItemsDB>;
  payment_id: string | null;
  sub_total: number;
}
