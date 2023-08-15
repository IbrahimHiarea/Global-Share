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

//Email api
export async function getEmails(search , skip , token , signal){
    return axiosApi.get(
        `/email?skip=${skip}&take=10&search=${search}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    );
}

export async function getEmailById(id , token , signal){
    return axiosApi.get(
        `/email/${id}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
    );
}

export async function createEmail({title , body ,recruitmentStatus , cc } , token , signal){
    const newRecruitmentStatus = recruitmentStatus.value.toUpperCase();
    const newCC = cc.value;
    return axiosApi.post(
        '/email',
        {title , body , 'recruitmentStatus':newRecruitmentStatus , 'cc':newCC},
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}

export async function updateEmail(id , values , token , signal){
    const newValues = {};
    for(let key of Object.keys(values)){
        if(key==='recruitmentStatus')
            newValues[key] = values[key].value.toUpperCase();
        else if(key==='cc')
            newValues[key] = values[key].value;
        else
            newValues[key] = values[key];
    }
    return axiosApi.put(
        `/email/${id}`,
        newValues,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}

export async function deleteEmail(id , token , signal){
    return axiosApi.delete(
        `/email/${id}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}