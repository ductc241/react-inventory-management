import instance from "./instance";

export const getUsersApi = () => {
  const url = `users`;
  return instance.get(url);
};
