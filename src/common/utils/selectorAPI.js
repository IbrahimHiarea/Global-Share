//import axios
import axios from 'axios';

//import component
import { Avatar } from '@mui/material';

//import image & icon
import avatarImage from '../../assets/images/profileImage/profile2.png';

//import baseURL
import {baseURL} from '../../common/utils/baseUrl';

const axiosApi = axios.create({
    baseURL : baseURL,
    timeout: 15000,
    headers: {
        "Content-type": "application/json",
    },
});

const randomColor = ['blueviolet' , 'cadetblue' , 'cornflowerblue' , 'darkcyan' , 'darkorchid' , 'grey' , 'purple']

//selector api
export async function getSquadsData({token , signal}){
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
        // console.log('filed to load squad option');
    }
    return options;
}

export async function getPositionDataBySquad({squadId , token , signal}){ 
    const options = [];
    if(!squadId || squadId==='') return options; 
    try{
        const response = await axiosApi.get(
            `/position?skip=0&take=0&search=&level=&squads=${squadId}`,
            {
                signal : signal,
                headers: {
                    Authorization : `Bearer ${token}`,
                }
            }
        );
        response.data.data.forEach(position => {
            options.push({value: position.id , label: position.name});
        });
        return options;
    }catch(error){
        // console.log('filed to load position option')
    }
    return options;
}

export async function getRolesData(token , signal){
    const options = [];
    try{
        const response = await axiosApi.get(
            `/role?skip=0&take=0`,
            {
                signal : signal,
                headers: {
                    Authorization : `Bearer ${token}`,
                }
            }
        ); 
        // response.data.data.forEach(squad => {
        //     options.push({value: squad.id , label: squad.gsName});
        // });
        return options;
    }catch(error){
        // console.log('filed to load role option');
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
        // console.log('filed to load questions');
    }
    return options;
}

export async function getMemberData({squadId , token , signal}){
    const options = [];
    if(!squadId || squadId==='') return options; 
    try{
        const response = await axiosApi.get(
            `/user?skip=0&take=0&search=&level=&status=&positions=&squad=${squadId}`,
            {
                signal : signal,
                headers: {
                    Authorization : `Bearer ${token}`,
                }
            }
        );
        response.data.data.forEach(user => {
            options.push({
                value: user.id, 
                name: user.firstName, 
                label: <Avatar 
                            alt={user.firstName} 
                            sx={{ 
                                width: 30, 
                                height: 30, 
                                backgroundColor: randomColor.at((user.id)%7)
                            }} 
                        >
                            {user.firstName?.at(0)}
                        </Avatar>
            })
        });
        return options;
    }catch(error){
        // console.log('filed to load member options')
    }
    return options;
}

export async function getAssignableMember({squadId , token , signal}){
    const options = [];
    if(!squadId || squadId==='') return options; 
    try{
        const response = await axiosApi.get(
            `/user?skip=0&take=0&squads=${squadId}&search=&level=&status=&positions=`,
            {
                signal : signal,
                headers: {
                    Authorization : `Bearer ${token}`,
                }
            }
        );
        response.data.data?.forEach(user => {
            options.push({
                value: user.id, 
                label: user.firstName + " " + user.lastName
            });
        });
        return options;
    }catch(error){
        // console.log('filed to load member options')
    }
    return options;
}