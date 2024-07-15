import { axiosInstance, handleError, handleResponse } from "./axiosInstance";

export const userLogin = async (data) =>
  await axiosInstance()
    .post(`login`, data)
    .then(handleResponse)
    .catch(handleError);
