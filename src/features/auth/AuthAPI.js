//import axios
import axios from 'axios';

const axiosApi = axios.create({
    baseURL : 'https://global-share.onrender.com',
    timeout: 15000,
    headers: {
        "Content-type": "application/json",
    },
});

//auth api
export async function loginRequest({username: email , password} , signal){
    return axiosApi.post( 
        '/auth/login', 
        { email , password }, 
        {signal: signal}
    );
}