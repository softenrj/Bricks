import axios, { AxiosError, AxiosResponse } from 'axios'
import { defaultApiRoute } from '../constance'
import toast from 'react-hot-toast'

const defaultAxios = axios.create({ baseURL: defaultApiRoute })

defaultAxios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('bricks:auth')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

defaultAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      toast.error("Session expired. Please log in again.", {
        style: {
          background: "#ff4d4f",
          color: "#fff",
          fontWeight: "500",
        }
      });
      localStorage.removeItem("bricks:auth");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default defaultAxios
