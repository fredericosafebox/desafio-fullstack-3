export interface INewUser {
  fullName: string;
  email: string;
  password: string;
  phone: number;
}

export interface IUpdateUser extends INewUser {
  visibility?: string;
}
