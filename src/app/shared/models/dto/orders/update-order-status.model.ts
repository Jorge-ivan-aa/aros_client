export interface UpdateOrderRequest {
  id: number;
  status?: string;
  date?: string;
  table?: number;
  totalPrice?: number;
}
