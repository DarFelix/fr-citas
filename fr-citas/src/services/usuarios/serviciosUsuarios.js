import { axiosInstance } from "../../helpers/axios-config";

const getUserByDoc =(numeroDoc) => {
    

    const TOKEN = localStorage.getItem('token');

    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }

    return axiosInstance.get(`usuario/documento/${numeroDoc}`, {headers});
    
}


const getMedicsByConsulta =(idEspecialidad) => {

    const TOKEN = localStorage.getItem('token');

    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }

    return axiosInstance.get(`usuario/medicosConsulta/${idEspecialidad}`, {headers});
}

export{
    getUserByDoc, getMedicsByConsulta
 }
  