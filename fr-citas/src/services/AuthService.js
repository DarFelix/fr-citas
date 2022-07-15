import { axiosInstance } from "../helpers/axios-config";
import qs from 'qs';

const crearAuth = async (correo, password) => {


  const BASIC_AUTH = 'c2Vydmlkb3ItcHJhY3RpY2FzOjEyMzQ1Ng==';
  const credentials = qs.stringify({username: correo, password, grant_type: 'password'});

    return axiosInstance.post('oauth/token', credentials, 
         {
          headers: {    
            'Authorization': `Basic ${BASIC_AUTH}`,
            'Content-Type': 'application/x-www-form-urlencoded'},

        })
}

/*


  return axiosInstance.post('oauth/token', credentials, 
         {
          headers: {    
            'Authorization': `Basic ${BASIC_AUTH}`,
            'Content-Type': 'application/x-www-form-urlencoded'},

        }
         
        ).then((res) => {
            console.log('Ingreso exitoso ', res)
        }).catch(error => {
            console.log(error)
        })


c2Vydmlkb3ItcHJhY3RpY2FzOjEyMzQ1Ng==
*/



export{
   crearAuth
}


