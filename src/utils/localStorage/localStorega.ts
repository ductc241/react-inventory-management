export const authenticated = (data: any, next: () => void) => {
  if (localStorage.getItem("user")) return next();
  localStorage.setItem("user", JSON.stringify(data[1]));
  localStorage.setItem("token", JSON.stringify(data.token));
  next();
};

export const isAuthenticated = () => {
  if (!localStorage.getItem("user")) return;
  return JSON.parse(localStorage.getItem("user") as string);
};
