//import package
import React  from 'react';
import clsx from 'clsx';

//import components
import AddStatus from '../PopUpComponents/AddStatus/AddStatus';
import AddTasks from '../PopUpComponents/AddTasks/AddTasks';

// import Icons 
import { GrFormAdd } from 'react-icons/gr';
import { BsTrash } from 'react-icons/bs';

//import style
import style from './TaskColHeader.module.css';

function TaskColHeader ({ children , dispatchPopUp}){

    const handleClick = () => {
        dispatchPopUp({
            type: 'open', 
            payload: <AddTasks />
        });
    }

    return(
        <div className={style['task-header']}>
            <div>{children}</div>
            <div className={style.icons}>
                <span className={style['delete-icon']} ><BsTrash/></span>
                <span className={style['add-icon']} onClick={handleClick} ><GrFormAdd/></span>
            </div>
        </div>
    );
}

function AddStatusButton({ children , dispatchPopUp}){

    const handleClick = () => {
        dispatchPopUp({
            type: 'open', 
            payload: <AddStatus />
        });
    }

    return(
        <div className={clsx(style['task-header'] , style['add-task'])}>
            <div>{children}</div>
            <div className={style.icons} onClick={handleClick}>
                <span className={style['add-icon']}><GrFormAdd/></span>
            </div>
        </div>
    );
}

export { AddStatusButton };
export default TaskColHeader;