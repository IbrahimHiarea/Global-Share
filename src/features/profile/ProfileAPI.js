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
    console.log(data,resume);
    const formData = new FormData();
    for (const key of Object.keys(data)){
        formData.append(key,data[key]);
    }
    formData.append('cv',JSON.stringify(resume));
    console.log(formData);
    return axiosApi.put(
        '/user',
        formData,
        {
            signal : signal,
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
    );
}