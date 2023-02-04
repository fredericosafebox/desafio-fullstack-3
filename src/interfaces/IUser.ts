export interface INewUser {
  fullName: string;
  email: string;
  password: string;
  phone: number;
}

export interface IUpdateUser extends INewUser {
  visibility: string;
}

export interface IProfile {
  fullName?: string;
  email?: string;
  phone?: number;
  updatedAt?: Date;
  createdAt?: Date;
  visibility?: string;
  role?: string;
  id?: number;
}

export interface IContactUpdate {
  fullName?: string;
  email?: string;
  phone?: number;
}
