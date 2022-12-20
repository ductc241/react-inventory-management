import instance from "./instance";

export const getAllUserApi = () => {
  const url = `user`;
  return instance.get(url);
};
