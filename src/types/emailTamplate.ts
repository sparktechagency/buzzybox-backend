export type ICreateAccount = {
  name: string;
  email: string;
  otp: number;
};

export type IResetPassword = {
  email: string;
  otp: number;
};

export type IContact = {
  name: string;
  email: string;
  message: string;
  subject: string;
};
