import axios from "axios";
import { message } from "antd";

const headers = {
  headers: {
    "x-api-key": "reqres-free-v1",
  },
};

export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data, headers);
    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    message.error(
      error.message || "An error occurred while making the request"
    );
  }
};

export const getRequest = async (url) => {
  try {
    const response = await axios.get(url, headers);
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    message.error(
      error.message || "An error occurred while making the request"
    );
  }
};

export const putRequest = async (url, data) => {
  try {
    const response = await axios.put(url, data, headers);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const deleteRequest = async (url,data) => {
  try{
    const response = await axios.delete(url,headers)
    return response
  }catch(e){
    console.log(e)
    throw new Error(e.message)
  }
}
