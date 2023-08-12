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


//position api
export async function getPositions({search , level , squad} , skip , token , signal){
    console.log(level);
    return axiosApi.get(
        `/position?skip=${skip}&take=10&search=${search}&level=${level}&squad=${squad}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    );
}

export async function getPositionById(id , token , signal){
    return axiosApi.get(
        `/position/${id}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
    );
}

export async function createPosition({name , gsName , weeklyHours , gsLevel , squadId , jobDescription} , token , signal){
    //send job file
    squadId = 11;
    return axiosApi.post(
        '/position',
        {
            name, 
            gsName, 
            weeklyHours: parseInt(weeklyHours), 
            gsLevel: gsLevel?.toUpperCase(),
            squadId,
        },
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    );
}

export async function updatePosition(id, values , token , signal){
    //check for send file job
    return axiosApi.put(
        `/position/${id}`,
        values,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}

export async function deletePosition(id , token , signal){ 
    return axiosApi.delete(
        `/position/${id}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}