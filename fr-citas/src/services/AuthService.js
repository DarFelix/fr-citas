import { axiosInstance } from "../helpers/axios-config";

const crearAuth = async (username, password) => {


  var basicAuth = 'Basic ' + btoa('servidor-practicas' + ':' + '123456');

    return axiosInstance.post('oauth/token', 
         {
            username: username,
            password: password,
            grant_type: 'password',
         }, 
         {
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': + basicAuth }
        }
         
        ).then((res) => {
            console.log('Esta es la rta: ', res)
        }).catch(err => {
            console.log(err)
        })

}



export{
   crearAuth
}