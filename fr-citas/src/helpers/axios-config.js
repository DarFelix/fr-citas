import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8005/api'
});

export{
    axiosInstance
}