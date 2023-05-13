//import package
import React from 'react';
import { useForm } from 'react-hook-form';

// import components 
import SubmitButton from '../../../../common/components/SubmitButton/SubmitButton';
import InputField from '../../../../common/components/Inputs/InputField/InputField';
import { cardStatus }  from '../../TaskCard/TaskCard'

// import MUI 
import { Avatar } from '@mui/material';

// import Icons 
import { IoCloseOutline } from "react-icons/io5";
import { RiSendPlaneLine } from "react-icons/ri";

//import style
import style from './TaskDetails.module.css';

function TaskDetails ({ 
        id, 
        priority, 
        title, 
        description, 
        deadline,
        difficulty, 
        url,
        comments,
        close
    }){

    const { register , formState , handleSubmit } = useForm({
        defaultValues:{
            comment: '',
        }
    })

    const onSubmit = async (data) => {
        console.log(data , id);
    }

    const handleDeleteComment = async (commentId) => {
        // Task ID  ,  Comment index
        console.log(commentId);
    }

    return (
        <div className={style['task-details']}>
            <div className={style.title}>
                <h2>{title}</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={close}
                />
            </div>
            <div className={style.members}>
                <div className={style.for}>
                    <div>For</div>
                    <div className={style.name}>
                        <Avatar 
                            src='' 
                            style={{
                                width: '24px', 
                                height: '24px'
                            }}
                        />
                        <div>Jake</div>
                    </div>
                </div>
                <div className={style.Assigned}>
                    <div>Assigned by</div>
                    <div className={style.name}>
                        <Avatar 
                            src='' 
                            style={{
                                width: '24px', 
                                height: '24px'
                                }}
                        />
                        <div>Jake</div>
                    </div>
                </div>
            </div>
            <div className={style.info}>
                <div className={style.status}
                    style={{backgroundColor: priority.toLowerCase()===cardStatus.important ? 'var(--primary-main)' 
                    : priority.toLowerCase()===cardStatus.urgent ? 'var(--primary-dark)' : null}}
                >{priority.toLowerCase()}</div>
                <div className={style.date}>{deadline}</div>
                <div className={style.complex}>{difficulty.toLowerCase()}</div>
            </div>
            <a className={style.link} href={url}>{url}</a>
            <div className={style.description}>{description}</div>
            <div className={style.comments}>
                <div className={style['comments-box']}>
                    {
                        comments?.map((comment , index) => (
                            // key change
                            <div key={index} className={style.comment}>
                                <Avatar 
                                    src='' 
                                    style={{
                                        width: '26px', 
                                        height: '26px'
                                    }}
                                />
                                <div className={style.text}>{comment}</div>
                                <div 
                                    className={style.delete} 
                                    onClick={() => handleDeleteComment(1)}
                                >
                                    <IoCloseOutline 
                                        size='15px' 
                                        cursor='pointer' 
                                        color='var(--natural-alpha-1)' 
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField 
                        type='text'
                        name='comment'
                        placeholder='Add a comment'
                        width='376px'
                        height='40px'
                        control={register('comment' , {
                                required: true
                            }
                        )}
                    />
                    <div 
                        className={style.send}
                        style={{
                            pointerEvents: (!formState.isValid ? 'none' : 'auto')
                        }}
                    >
                        <SubmitButton 
                            width='40px' 
                            height='40px' 
                            disabled={!formState.isValid}
                        />
                        <RiSendPlaneLine 
                            className={style['send-icon']} 
                            color='#768396' 
                            size='20px'
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskDetails;