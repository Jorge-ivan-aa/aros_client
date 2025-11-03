export interface OrderResponse {
  id: number;
  status: string;
  date: string; // ISO or string date as received from API
  table: string;
  totalPrice: number;
}
