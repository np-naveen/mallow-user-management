import Constant from "../Utils/constant";
import endpoint from "../Utils/endpoint";
import { getRequest, postRequest } from "./requestComponent";

export const tokenService = {
  setToken: (token) => {
    localStorage.setItem(Constant.AUTH_TOKEN, token);
  },
  getToken: () => localStorage.getItem(Constant.AUTH_TOKEN),
  clearToken: () => {
    localStorage.removeItem(Constant.AUTH_TOKEN);
  },
};

export const fetchUserData = async (pageNo) => {
  try {
    const response = await getRequest(`${endpoint.FETCH_USERS}?page=${pageNo}`);
    console.log("User data fetched successfully:", response);
    return response?.data
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const createUser = async (userData) => {
  try {
    const response = await postRequest(endpoint.CREATE_USER, userData);
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
