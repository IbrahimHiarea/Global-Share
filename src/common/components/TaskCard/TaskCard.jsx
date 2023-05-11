//import package
import React from 'react';

//import style
import style from './TaskCard.module.css';

// import Mui
import { Avatar } from '@mui/material';

function TaskCard ({ status , title , description , date , complex}){
    return (
        <div className={style['task-card']}>
            <div className={style['card-header']}>
                <div className={style.status}>{status}</div>
                <div className={style.complex}>{complex}</div>
            </div>
            <h3 className={style.title}>{title}</h3>
            <div className={style.description}>{description}</div>
            <div className={style.date}>{date}</div>
            <div className={style.members}>
                <Avatar src='../../../assets/images/profileImage/profile.png' sx={{width: '22px' , height: '22px'}}></Avatar>
                <Avatar src='../../../assets/images/profileImage/profile.png' sx={{width: '22px' , height: '22px'}}></Avatar>
            </div>
        </div>
    );
}

export default TaskCard;