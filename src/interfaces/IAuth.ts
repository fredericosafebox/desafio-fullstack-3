import { IProfile } from "../interfaces/IUser";

export interface IContact {
  id: number;
  fullName: string;
  email: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export default interface IAuth {
  authState: boolean;
  token: string | null;
  user: IProfile | null;
  contacts: IContact[];
}
