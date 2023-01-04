import instance from "./instance";

export const getAllUserApi = () => {
  const url = `user`;
  return instance.get(url);
};

export const deleteUser = (id: any) => {
  const url = `user/${id}`;
  return instance.delete(url);
};

export const createUser = (data: any) => {
  const url = `user`;
  return instance.post(url, data);
};

export const updateUser = (id: any, data: any) => {
  const url = `user/${id}`;
  return instance.put(url, data);
};

export const getOneUser = (id: any) => {
  const url = `user/${id}`;
  return instance.get(url);
};
