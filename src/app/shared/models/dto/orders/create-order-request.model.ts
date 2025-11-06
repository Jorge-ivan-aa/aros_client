export interface CreateOrderRequest {
  table: number;
  responsible: string;  // User document ID
  clientOrders: {
    details: {
      product: number;
      quantity: number;
      observations: string;
      subProducts: number[];
    }[];
  }[];
}
