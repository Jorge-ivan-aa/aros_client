export interface CreateUserRequest {
  document: number,
  name: string,
  email: string,
  phone: string,
  address: string,
  password: string,
  areas: string[]
}