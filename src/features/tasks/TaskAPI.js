//import axios
import axios from 'axios';

const axiosApi = axios.create({
    baseURL : 'https://global-share.onrender.com',
    timeout: 15000,
    headers: {
        "Content-type": "application/json",
    },
});


//get task by squad 
export async function fetchTasksBySquad(squadId , token , signal){
    return axiosApi.get(
        `/task/squad/${squadId}`,
        {
            signal: signal,
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
    );
}