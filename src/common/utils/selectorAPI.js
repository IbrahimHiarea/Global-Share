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

//selector api
export async function getSquadsData(token , signal){
    const options = [];
    try{
        const response = await axiosApi.get(
            `/squad?skip=0&take=0&search=`,
            {
                signal : signal,
                headers: {
                    Authorization : `Bearer ${token}`,
                }
            }
        ); 
        response.data.data.forEach(squad => {
            options.push({value: squad.id , label: squad.gsName});
        });
        return options;
    }catch(error){
        console.log('filed to load options');
    }
    return options;
}

export async function getQuestionsData(token , signal){
    const options = [];
    try{
        const response = await axiosApi.get(
            `/question?skip=0&take=0&search=`,
            {
                signal : signal,
                headers: {
                    Authorization : `Bearer ${token}`,
                }
            }
        ); 
        // console.log(response);
        response.data.data.forEach(question => {
            options.push({value: question.id , label: question.text.toLowerCase() + ' - ' + question.type.toLowerCase()});
        });
        return options;
    }catch(error){
        console.log('filed to load questions');
    }
    return options;
}

//TODO :: getPositionData