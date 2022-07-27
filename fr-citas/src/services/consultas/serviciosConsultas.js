import { axiosInstance } from "../../helpers/axios-config";

const getConsultas = () =>{

    const TOKEN = localStorage.getItem('token');
    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }
    return axiosInstance.get('consulta', {headers} );
}

const getConsultaById =(idConsulta) => {
    

    const TOKEN = localStorage.getItem('token');

    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }

    return axiosInstance.get(`consulta/${idConsulta}`, {headers});
    
}
 
export{
    getConsultas, getConsultaById
}