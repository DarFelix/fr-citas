import { axiosInstance } from "../../helpers/axios-config";

const getEspecialidades =() => {
    

    const TOKEN = localStorage.getItem('token');

    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }

    return axiosInstance.get(`especialidad`, {headers});
    
}

export{
    getEspecialidades
 }
  