import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StringConstants } from "../Theme/StringConstants";
import { ApiConstants } from "../Theme/ApiConstants";

const api = axios.create({
  baseURL: ApiConstants.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // ✅ Always treat all HTTP codes as valid responses
  validateStatus: () => true,
});

// Request interceptor
api.interceptors.request.use(
  async (config: any) => {
    try {
      const token = await AsyncStorage.getItem(StringConstants.ACCESS_TOKEN);
      console.log("token in apiClient:", token);

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Token ${token}`, 
        };
      }

      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      }

      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return config;
    }
  },
  (error: any) => Promise.reject(error)
);



// ✅ Response interceptor: normalize all responses

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Success response (server returned anything)
    const data = response.data;

    // Try to extract meaningful message
    let message =
      data?.errors?.email?.[0] ||
      data?.errors?.password?.[0] ||
      data?.message ||
      "Something went wrong, Please try again later";

    return {
      ...response,
      message,
      error: false,
    };
  },
  (error: any) => {
    // Network error or server did not respond
    const status = error.response?.status || 0; // 0 means network error
    const data = error.response?.data || {};

    let message = "Something went wrong, Please try again later";

    if (status === 0) {
      // Network error
      message = "No internet connection. Please check your network.";
    }
    else if (status == 500){
       message = "Something went wrong at our server, Please try again later";
    }
    else {
      // Server responded with error
      message =
        data?.errors?.email?.[0] ||
        data?.errors?.password?.[0] ||
        data?.message ||
        message;
    }

    return Promise.resolve({
      status,
      data,
      error: true,
      message,
    });
  }
);



export interface ApiResponse<T = any> extends AxiosResponse<T> {
  message: string;
  error?: boolean;
}

// Common GET method
export const getRequest = async (url: string, params?: object): Promise<ApiResponse> => {
  return await api.get(url, { params });
};

// Common POST method
export const postRequest = async (url: string, body?: object): Promise<ApiResponse> => {
  return await api.post(url, body);
};


// Common PUT method
export const putRequest = async (url: string, body?: object): Promise<ApiResponse> => {
  return await api.put(url, body);
};

// Common DELETE method
export const deleteRequest = async (url: string): Promise<ApiResponse> => {
  return await api.delete(url);
};

// Common PATCH method
export const patchRequest = async (url: string, body?: object): Promise<ApiResponse> => {
  return await api.patch(url, body);
};


export default api;

