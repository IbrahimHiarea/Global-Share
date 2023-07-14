//import axios
import axios from 'axios';

//import baseURL
import { baseURL } from '../../common/utils/baseUrl';

const axiosApi = axios.create({
    baseURL : baseURL,
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