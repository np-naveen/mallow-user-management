import Constant from "../Utils/constant";
import endpoint from "../Utils/endpoint";
import { deleteRequest, getRequest, postRequest, putRequest } from "./requestComponent";

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
    return response
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

export const updateUser = async (id, userData) => {
  try{
    const response = await putRequest(`${endpoint.UPDATE_USER}/${id}`, userData)
    return response
  }catch(e){
    console.error(e)
  }
}

export const deleteUser = async (id) => {
  try{
    const response = await deleteRequest(`${endpoint.DELETE_USER}/${id}`)
    return response
  }catch(e){
    throw new Error("Failed to delete")
  }
}
