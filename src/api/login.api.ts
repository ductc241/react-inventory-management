import { UserType } from "../types/user.type";
import instance from "./instance";

export const signin = (user: UserType) => {
  const url = "/login";
  return instance.post(url, user);
};

export const logout = () => {
  const url = `logout`;
  return instance.get(url);
};
