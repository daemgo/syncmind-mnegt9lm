export interface SalesOrder {
  id: string;
  orderNo: string;
  customerId: string;
  customerName: string;
  productName: string;
  amount: number;
  quantity: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  deliveryDate: string;
}

export type SalesOrderStatus = SalesOrder["status"];
