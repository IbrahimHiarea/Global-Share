//import axios
import axios from 'axios';

const axiosApi = axios.create({
    baseURL : 'https://global-share.onrender.com',
    timeout: 15000,
    headers: {
        "Content-type": "application/json",
    },
});


//profile api
export async function fetchProfileDetails(token , signal){
    return axiosApi.get(
        '/user/profile',
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
    );
}


// TODO::
// resume file sent
export async function updateProfileDetails({resume , ...data}, token , signal){
    return axiosApi.post(
        '/user',
        data,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
    );
}