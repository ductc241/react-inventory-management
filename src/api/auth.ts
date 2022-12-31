import { UserType } from "../types/user.type";
import instance from "./instance";

export const signin = (user: UserType) => {
  // console.log(user);
  const url = "/login";
  return instance.post(url, user);
};

export const signup = (user: UserType) => {
  const url = `signup`;
  return instance.post(url, user);
};
