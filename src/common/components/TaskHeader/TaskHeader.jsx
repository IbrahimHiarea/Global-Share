//import package
import React, { useState } from 'react';

//import style
import style from './TaskHeader.module.css';

// import Icons 
import { GrFormAdd } from 'react-icons/gr';
import { SlOptions } from 'react-icons/sl';
import { RiDeleteBin6Line } from 'react-icons/ri';

function TaskHeader ({ title , isAdd }){

    const [clicked,setClicked] = useState(false);

    return (
        <div className={!isAdd ? style['task-header'] : style['add-task']}>
            <div className={style.title}>{title}</div>
            <div className={style.icons}>
                {isAdd ? <></> : 
                    <div>
                        <SlOptions color='#768396' onClick={() => setClicked(!clicked)}></SlOptions>
                        {clicked  &&  
                            <div className={style.delete}>
                                <RiDeleteBin6Line color='red'></RiDeleteBin6Line>
                                <div className>Delete</div>
                            </div>
                        }
                    </div>
                }
                <GrFormAdd className={style['add-icon']}></GrFormAdd>
            </div>
        </div>
    );
}

export default TaskHeader;