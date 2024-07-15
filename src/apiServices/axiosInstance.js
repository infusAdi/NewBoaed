import axios from "axios";
import { success } from "../../src/reduxStore/reducer/fetchReducers";

function axiosInstance(token) {
  
  if (token) {
    return axios.create({
      baseURL:'http://18.158.81.67:80/api/',
      headers: { Authorization: "Bearer " + token },
    });
  } else {
    return axios.create({
      baseURL: "http://18.158.81.67:80/api/",
    });
  }
}

function handleResponse(response) {
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 204
  ) {
    if (response.status === 204) {
      return { success: true };
    } else {
      return response.data;
    }
  } else if (response.status === 401) {
    if (window.location.href !== "/auth/login")
      window.location.href = "/auth/login";
  }
}

function handleError(error) {
  if (error?.response?.status === 401) {
    if (window.location.href !== "/auth/login")
      window.location.href = "/auth/login";
  } else if (error?.response?.status === 409) {
    let string = error.response.data.error.message.split("(");
    let string2 = string[1].split(")");
    return {
      success: false,
      conflict: true,
      message: string2[0],
    };
  }
  return error?.response?.data;
}

export { axiosInstance, handleResponse, handleError };
