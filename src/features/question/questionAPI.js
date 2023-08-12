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

//question api
export async function getQuestions(search , skip , token , signal){
    return axiosApi.get(
        `/question?skip=${skip}&take=10&search=${search}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    );
}

export async function getQuestionById(id , token , signal){
    return axiosApi.get(
        `/question/${id}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
    );
}

export async function createQuestion({text , type , options} , token , signal){
    const newType = type.toUpperCase();
    const newOptions = options.map(option => option.value);
    return axiosApi.post(
        '/question',
        {text , 'type':newType , 'options': newOptions},
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}

export async function updateQuestion(id , values , token , signal){
    const newValues = {};
    for(let key of Object.keys(values)){
        if(key==='type') newValues[key] = values[key].toUpperCase();
        else if(key==='options') newValues[key] = values?.options?.map(option => option.value);
        else newValues[key] = values[key];
    }
    
    return axiosApi.put(
        `/question/${id}`,
        newValues,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}

export async function deleteQuestion(id , token , signal){
    return axiosApi.delete(
        `/question/${id}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}