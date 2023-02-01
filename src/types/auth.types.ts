export interface registerPayload {
  email: string;
  name: string;
  lastName: string;
  phone: string;
  password: string;
  address: string;
}

export interface loginPayload {
  email: string;
  password: string;

}
