export interface DayMenuProductCategory {
  category: number;
  position: number;
  products: number[];
}

export interface DayMenuCreateRequest {
  name: string;
  price: number;
  date: string;
  products: DayMenuProductCategory[];
}

export interface DayMenuUpdateRequest {
  id: number;
  name?: string;
  price?: number;
  products?: DayMenuProductCategory[];
}
