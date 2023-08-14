//import axios
import axios from 'axios';

//import baseURL
import {baseURL} from '../../common/utils/baseUrl';

const axiosApi = axios.create({
    baseURL : baseURL,
    timeout: 15000,
    headers: {
        "Content-type": "vacancy/json",
    },
});

//vacancy api
export async function getVacancies(search , skip , token , signal){
    return axiosApi.get(
        `/vacancy?skip=${skip}&take=10&search=${search}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    );
}

export async function createVacancy({ effect , brief , tasks , required , preferred , positionId , questionsIds }, token , signal){
    const newPositionId = positionId.value;
    const newQuestionsIds = questionsIds.map((question) => {return question.value.value});
    const newValues = {
        "effect": "Short paragraphs are easier to read and understand. Writing experts recommend paragraphs of no more than 150 words in three to eight sentences.",
        "brief": "Short paragraphs are easier to read and understand. Writing experts recommend paragraphs of no more than 150 words in three to eight sentences.",
        "tasks": "Short paragraphs are easier to read and understand. Writing experts recommend paragraphs of no more than 150 words in three to eight sentences.",
        "required": "Short paragraphs are easier to read and understand. Writing experts recommend paragraphs of no more than 150 words in three to eight sentences.",
        "preferred": "Short paragraphs are easier to read and understand. Writing experts recommend paragraphs of no more than 150 words in three to eight sentences.",
        "positionId": 11,
        "questionsIds": [5, 6, 7]
    };
    const req = JSON.stringify(newValues);
    return axiosApi.post(
        '/vacancy',
        // { effect , brief , tasks , required , preferred , 'positionId':newPositionId , 'questionsIds':newQuestionsIds },
        {req},
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}

export async function updateVacancy(id , values , token , signal){
    const newValues = {};
    for(let key of Object.keys(values)){
        for(let key of Object.keys(values)){
            if(key !== 'squad'){
                //TODO:: questions
                if(key === 'positionId')
                    newValues[key] = values[key].value;
                else
                    newValues[key] = values[key];
            }
            
        }
    }
    return axiosApi.put(
        `/vacancy/${id}`,
        newValues,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}

export async function deleteVacancy(id , token , signal){
    return axiosApi.delete(
        `/vacancy/${id}`,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }
    )
}