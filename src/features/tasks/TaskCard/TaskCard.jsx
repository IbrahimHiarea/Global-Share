//import package
import React from 'react';

// import icons 
import { BiMessageAlt } from "react-icons/bi"

//import style
import style from './TaskCard.module.css';

const cardStatus = {
    normal: 'normal',
    important: 'important',
    urgent: 'urgent'
}

function TaskCard ({ id , priority , title , description , deadline , difficulty , comments }){
    return (
        <div className={style['task-card']} >
            <div className={style['card-header']}>
                <div
                    style={{backgroundColor: priority.toLowerCase()===cardStatus.important ? 'var(--primary-main)' 
                            : priority.toLowerCase()===cardStatus.urgent ? 'var(--primary-dark)' : null}}
                    className={style.status}
                >
                    {priority.toLowerCase()}
                </div>
                <div className={style.complex}>{difficulty.toLowerCase()}</div>
            </div>
            <div className={style['card-body']}>
                <h3 className={style.title}>{title}</h3>
                <div className={style.description}>{description}</div>
            </div>
            <div className={style['card-footer']}>
                <div className={style.date}>{deadline}</div>
                <div className={style.comments}>
                    <BiMessageAlt  color='#768396' size='15px'></BiMessageAlt>
                    <div> {comments.length} Comment</div>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;