//import package
import React, { useState } from 'react';
import clsx from 'clsx';

// import Component 
import AddStatus from '../Add Status/AddStatus';

// import Icons 
import { GrFormAdd } from 'react-icons/gr';
import { BsTrash } from 'react-icons/bs';

//import style
import style from './TaskColHeader.module.css';

function TaskColHeader ({ children , isAdd }){

    const [addStatus,setAddStatus] = useState(false);

    if(!isAdd){
        return(
            <div className={style['task-header']}>
                <div>{children}</div>
                <div className={style.icons}>
                    <span className={style['delete-icon']} ><BsTrash/></span>
                    <span className={style['add-icon']} ><GrFormAdd/></span>
                </div>
            </div>
        );
    }
    else{
        return (
            <>
                { addStatus  &&
                    <AddStatus
                        setAddStatus={setAddStatus}
                    ></AddStatus>
                }
                {
                    <div className={clsx(style['task-header'] , style['add-task'])}>
                        <div>{children}</div>
                        <div className={style.icons}>
                            <span className={style['add-icon']} onClick={() => setAddStatus(true)} ><GrFormAdd/></span>
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default TaskColHeader;