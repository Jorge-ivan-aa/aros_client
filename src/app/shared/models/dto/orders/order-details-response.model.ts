export interface OrderDetailsResponse {
  id: number;
  status: string; // expecting values like 'PENDING', 'COMPLETED', etc.
  takedAt: string;
  total: number;
  tableName: string;
  responsibleName: string;
  clientOrders: ClientOrder[];
}

export interface ClientOrder {
  id: number;
  total: number;
  status: string;
  details: ClientOrderDetail[];
}

export interface ClientOrderDetail {
  id: number;
  name: string;
  price: number;
  quantity: number;
  observations: string;
}
