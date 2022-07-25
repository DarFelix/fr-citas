import { axiosInstance } from "../../helpers/axios-config";

const getUserByDoc =(numeroDoc) => {
    
    console.log(numeroDoc);

    const TOKEN = localStorage.getItem('token');

    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }

    return axiosInstance.get(`usuario/documento/${numeroDoc}`, {headers});
    
}

export{
    getUserByDoc
 }
 