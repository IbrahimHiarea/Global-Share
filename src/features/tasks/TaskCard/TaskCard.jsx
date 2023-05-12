//import package
import React, { useState } from 'react';

// import component 
import TaskDetails from '../TaskDetails/TaskDetails';

// import icons 
import { BiMessageAlt } from "react-icons/bi"

//import style
import style from './TaskCard.module.css';

export const cardStatus = {
    normal: 'normal',
    important: 'important',
    urgent: 'urgent'
}

function TaskCard ({ id , priority , title , description , deadline , difficulty , comments , url }){

    const [clicked,setClicked] = useState(false);

    return (
        <>
            {clicked  &&  
                <TaskDetails 
                    id={id}
                    priority={priority}
                    title={title}
                    deadline={deadline}
                    difficulty={difficulty}
                    description={description}
                    url={url}
                    comments={comments}
                    setClicked={setClicked}
                ></TaskDetails>
            }
            {
                <div className={style['task-card']} onClick={() => setClicked(true)} >
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
            }
        </>
    );
}

export default TaskCard;