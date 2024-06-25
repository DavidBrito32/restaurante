import { z } from "zod";
import { PAYMENTMETHOD } from "../../models/client/paymentCard";
import { ORDER_STATUS } from "./db";


export interface OrdersItems {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Orders {
  id: string;
  clientId: string;
  deliveryAdress: string;
  orderStatus: string;
  orderDate: string;
  completedAt: string | null;
  notes: string | null;
  items: Array<OrdersItems>;
  paymentMethod: PAYMENTMETHOD;
  paymentId: string | null;
  subTotal: number;
}

// GET ORDERS

export interface GetOrdersInputDTO {
  authorization: string;
}

export interface GetOrdersOutputDTO {
  message: string;
  orders: Array<Orders>;
}

export const GetOrdersSchema = z
  .object({
    authorization: z
      .string({
        required_error:
          "'authorization' - é um campo obrigatorio e deve ser enviado no header da requisição",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(20),
  })
  .transform((data) => data as GetOrdersInputDTO);
// INPUTS

// INSERT ORDER
export interface InsertOrderInputDTO {
  authorization: string;
  deliveryAdress: string;
  notes: string | null;
  paymentMethod: PAYMENTMETHOD;
  items: Array<OrdersItems>;
  paymentId: string | null;
  subTotal: number;
}

export interface InsertOrderOutputDTO {
  message: string;
}

export const InsertOrderSchema = z
  .object({
    authorization: z
      .string({
        required_error:
          "'authorization' - é um campo obrigatorio e deve ser enviado no header da requisição",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(20),
    deliveryAdress: z
      .string({
        required_error: "'deliveryAdress' é um campo obrigatorio",
        invalid_type_error:
          "'deliveryAdress' - deve ser enviado no formato string",
      })
      .min(5),
    notes: z.string({
      invalid_type_error: "'notes' - deve ser enviado no formato string",
    }),
    paymentMethod: z.enum([
      PAYMENTMETHOD.CASH,
      PAYMENTMETHOD.CREDIT,
      PAYMENTMETHOD.DEBIT,
      PAYMENTMETHOD.PIX,
    ]),
    items: z.array(
      z.object({
        productId: z.string({
          invalid_type_error:
            "'productId' - deve ser enviado no formato string",
          required_error: "'productId' - é um dado obrigatorio",
        }),
        quantity: z.number({
          invalid_type_error: "'quantity' - deve ser enviado no formato number",
          required_error: "'quantity' - é um dado obrigatorio",
        }),
        unitPrice: z.number({
          invalid_type_error:
            "'unitPrice' - deve ser enviado no formato number",
          required_error: "'unitPrice' - é um dado obrigatorio",
        }),
      }),
    ),
    paymentId: z
      .string({
        invalid_type_error: "'paymentId' - deve ser enviado no formato string",
      })
      .optional(),
      subTotal: z.number({
      required_error: "'subTotal' - é um dado obrigatorio",
      invalid_type_error: "'subTotal' - deve ser enviado no formato number",
    }),
  })
  .strict()
  .transform((data) => data as InsertOrderInputDTO);

// UPDATE ORDER

export interface UpdateOrderInputDTO {
  authorization: string;
  id: string;
  deliveryAdress?: string;
  orderStatus?: string;
  orderDate?: string;
  completedAt?: string | null;
  notes?: string | null;
  paymentMethod?: PAYMENTMETHOD;
  paymentId?: string | null;
  subTotal?: number;
}

export interface UpdateOrderOutputDTO {
  message: string;
}

export const updateOrderSchema = z
  .object({
    authorization: z
      .string({
        required_error:
          "'authorization' - é um campo obrigatorio e deve ser enviado no header da requisição",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(20),
    id: z
      .string({
        required_error:
          "'id' - é um campo obrigatorio e deve ser enviado no header da requisição",
        invalid_type_error: "'id' - deve ser enviado no formato string",
      })
      .min(10),
    deliveryAdress: z
      .string({
        required_error: "'deliveryAdress' é um campo obrigatorio",
        invalid_type_error:
          "'deliveryAdress' - deve ser enviado no formato string",
      })
      .min(5)
      .optional(),
    orderStatus: z
      .enum([
        ORDER_STATUS.PROCESSAMENTO,
        ORDER_STATUS.EM_PREPARO,
        ORDER_STATUS.SAINDO_PARA_ENTREGA,
        ORDER_STATUS.CONCLUIDO,
      ])
      .optional(),
    orderDate: z.string({
      required_error: "",
      invalid_type_error: "",
    }),
    completedAt: z
      .string({
        invalid_type_error: "",
      })
      .optional()
      .nullable(),
    notes: z
      .string({
        invalid_type_error: "",
      })
      .optional(),
    paymentMethod: z.enum([
      PAYMENTMETHOD.CASH,
      PAYMENTMETHOD.CREDIT,
      PAYMENTMETHOD.DEBIT,
      PAYMENTMETHOD.PIX,
    ]),
    paymentId: z
      .string({
        invalid_type_error: "'paymentId' - deve ser enviado no formato string",
      })
      .optional(),
    subTotal: z
      .number({
        required_error: "'subTotal' - é um dado obrigatorio",
        invalid_type_error: "'subTotal' - deve ser enviado no formato number",
      })
      .optional(),
  })
  .strict()
  .transform((data) => data as UpdateOrderInputDTO);

// DELETE ORDER

export interface DeleteOrderInputDTO {
  authorization: string;
  id: string;
}

export interface DeleteOrderOutputDTO {
  message: string;
}

export const DeleteOrderSchema = z
  .object({
    authorization: z
      .string({
        required_error:
          "'authorization' - é um campo obrigatorio e deve ser enviado no header da requisição",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(20),
    id: z
      .string({
        required_error:
          "'id' - é um campo obrigatorio e deve ser enviado no header da requisição",
        invalid_type_error: "'id' - deve ser enviado no formato string",
      })
      .min(10),
  })
  .strict()
  .transform((data) => data as DeleteOrderInputDTO);
