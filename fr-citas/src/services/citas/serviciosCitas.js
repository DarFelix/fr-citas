import { axiosInstance } from "../../helpers/axios-config";


const lista = () => {

    const TOKEN = localStorage.getItem('token');
    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }
    return axiosInstance.get('cita', {headers} );

}

const listaPag = () => {

    const TOKEN = localStorage.getItem('token');

    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }
    const params = {
        pageNo: 0,
        pageSize: 3,
        sortBy: 'idCita'
    }
    
    return axiosInstance.get('cita/paging',{params,headers});

}

const getCitas =(params) => {

    const TOKEN = localStorage.getItem('token');

    const headers = {
        'Authorization': `bearer ${TOKEN}`,
        'Content-type': 'application/json'
    }

    return axiosInstance.get('cita/cits', {params, headers});
}



export{
    lista, listaPag, getCitas
 }
 