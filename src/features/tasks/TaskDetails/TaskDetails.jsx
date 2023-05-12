//import package
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// import components 
import SubmitButton from '../../../common/components/SubmitButton/SubmitButton';
import InputField from '../../../common/components/InputField/InputField';
import { cardStatus }  from '../TaskCard/TaskCard'

// import MUI 
import { Avatar } from '@mui/material';

// import Icons 
import { IoCloseOutline } from "react-icons/io5";
import { RiSendPlaneLine } from "react-icons/ri";

//import style
import style from './TaskDetails.module.css';

function TaskDetails ({ id , priority , title , description , deadline , difficulty , url , comments , setClicked}){

    const { register , formState , handleSubmit } = useForm({
        defaultValues:{
            comment: '',
        }
    })

    const onSubmit = async (data) => {
        // new Comment
        console.log(data);
        
    }

    const handleDelete = async (data , indx) => {
        // Task ID  ,  Comment index
        console.log(id , indx);
    }

    return (
        <div className={style['pop-up']}>
            <div className={style['task-details']}>
                <div className={style.title}>
                    <h2>{title}</h2>
                    <IoCloseOutline size='20px' color='#4F4F4F' cursor='pointer' onClick={() => setClicked(false)}></IoCloseOutline>
                </div>
                <div className={style.members}>
                    <div className={style.for}>
                        <div>For</div>
                        <div className={style.name}>
                            <Avatar src='' style={{width: '24px' , height: '24px'}}></Avatar>
                            <div>Jake</div>
                        </div>
                    </div>
                    <div className={style.Assigned}>
                        <div>Assigned by</div>
                        <div className={style.name}>
                            <Avatar src='' style={{width: '24px' , height: '24px'}}></Avatar>
                            <div>Jake</div>
                        </div>
                    </div>
                </div>
                <div className={style.info}>
                    <div className={style.status}
                        style={{backgroundColor: priority.toLowerCase()===cardStatus.important ? 'var(--primary-main)' 
                        : priority.toLowerCase()===cardStatus.urgent ? 'var(--primary-dark)' : null}}
                    >{priority}</div>
                    <div className={style.date}>{deadline}</div>
                    <div className={style.complex}>{difficulty}</div>
                </div>
                <div className={style.link}>{url}</div>
                <div className={style.description}>{description}</div>
                <div className={style.comments}>
                    <div className={style['comments-box']}>
                        {
                            comments?.map((comment,indx) => {
                                return(
                                    <>
                                        <div className={style.comment}>
                                            <Avatar src='' style={{width: '26px' , height: '26px'}}></Avatar>
                                            <div className={style.text}>{comment}</div>
                                            <div className={style.delete} onClick={data => handleDelete(data , indx)}>
                                                <IoCloseOutline size={'15px'} cursor='pointer' color='#768396'></IoCloseOutline>
                                            </div>
                                        </div>
                                    </>
                                );
                            })
                        }
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField 
                            type='text'
                            name='comment'
                            placeholder='Add a comment'
                            width='376px'
                            height='40px'
                            control={register('comment')}
                            required
                        />
                        <div className={style.send}>
                            <SubmitButton width='40px' height='40px'></SubmitButton>
                            <RiSendPlaneLine className={style['send-icon']} color='#768396' size='20px'></RiSendPlaneLine>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;