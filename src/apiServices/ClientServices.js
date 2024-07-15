import { axiosInstance, handleError, handleResponse } from "./axiosInstance";

export const clientList = async (token, data) =>
  await axiosInstance(token)
    .get(`Clients/${data}`)
    .then(handleResponse)
    .catch(handleError);

export const addClient = async (token, data) =>
  await axiosInstance(token)
    .post(`Clients`, data)
    .then(handleResponse)
    .catch(handleError);

export const editClient = async (token, cId, data) =>
  await axiosInstance(token)
    .patch(`Clients(${cId})`, data)
    .then(handleResponse)
    .catch(handleError);

export const getClientById = async (token, cId) =>
  await axiosInstance(token)
    .get(`Clients(${cId})`)
    .then(handleResponse)
    .catch(handleError);
