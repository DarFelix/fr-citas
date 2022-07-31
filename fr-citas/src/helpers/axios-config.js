import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8005/api'
});

/*
axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        window.location.pathname = '/';
      }
    });
  */

export{
    axiosInstance
}