import { AreaSimpleResponse } from "../areas/area-simple-response";

export interface UserResponse {
  document: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  areas: AreaSimpleResponse[]
}