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


//volunteer api
export async function getVolunteers({search , level , status , position ,squad} , skip , token , signal){
    return axiosApi.get(
        `/user?skip=${skip}&take=10&search=${search}&level=${level}&status=${status}&positions=${position}&squads=${squad}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}

export async function getVolunteerById(id , token , signal){
    return axiosApi.get(
        `/user/${id}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
    )
}   

export async function createVolunteer({firstName , lastName , email, password , positions , roleId} , token , signal){
    const newPositions = [];
    positions.forEach(element => {
        newPositions.push({positionId: element.position.value})
    });

    return axiosApi.post(
        '/user',
        {firstName , lastName , password , email , positions: newPositions , roleId},
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    );
}

export async function updateVolunteer(id , values , token , signal){
    const newValues = {};
    for(let key of Object.keys(values)){
        if(key==='positions'){
            const newPositions = [];
            values[key].forEach(element => {
                newPositions.push({positionId: element.position.value})
            });
            newValues[key] = newPositions;
        }
        else newValues[key] = values[key]; 
    }

    console.log(newValues);
    return axiosApi.put(
        `/user/${id}`,
        newValues,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}

export async function deleteVolunteer(id , token , signal){
    return axiosApi.delete(
        `/user/${id}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}