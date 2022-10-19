import { UserType } from "../../types/user.type";

export const authenticated = (user: UserType, next: () => void) => {
  if (localStorage.getItem("user")) return next();
  localStorage.setItem("user", JSON.stringify(user));
  next();
};

export const isAuthenticated = () => {
  if (!localStorage.getItem("user")) return;
  return JSON.parse(localStorage.getItem("user") as string);
};
