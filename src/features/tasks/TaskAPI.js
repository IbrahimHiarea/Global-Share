//import axios
import axios from 'axios';

//import baseURL
import {baseURL} from '../../common/utils/baseUrl';

const axiosApi = axios.create({
    baseURL : baseURL,
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