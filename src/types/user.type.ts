/* eslint-disable no-unused-vars */
export type UserType = {
  id?: number;
  userName?: string;
  email: string;
  password: string;
  role?: number;
};

export enum UserAction {
  ADD,
  EDIT,
  REMOVE
}
