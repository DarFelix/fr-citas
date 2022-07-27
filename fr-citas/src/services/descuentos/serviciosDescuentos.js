import { axiosInstance } from "../../helpers/axios-config";

const getDescuentosActivos=() => {
    const TOKEN = localStorage.getItem('token');

    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }

    return axiosInstance.get(`descuentoMotivo/descuentosActivos`, {headers});
}

const getDescuentoById =(idDescuento) => {
    

    const TOKEN = localStorage.getItem('token');

    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }

    return axiosInstance.get(`descuentoMotivo/${idDescuento}`, {headers});
    
}


export{
    getDescuentosActivos, getDescuentoById
} 