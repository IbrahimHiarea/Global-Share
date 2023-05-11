// import react
import React from "react";

//import components
import TaskColHeader from "../TaskColHeader/TaskColHeader";

// import style 
import style from './TaskColumn.module.css';
import TaskCard from "../TaskCard/TaskCard";

function TaskColumn({statusId , statusName , tasks , isAdd}){
    return (
        <div className={style['task-column']}>
            <TaskColHeader isAdd={isAdd}>{statusName}</TaskColHeader>
            <div className={style['task-column-body']}>
                {
                    tasks?.map((task) => (
                        <TaskCard key={task.id} {...task} />
                    ))
                }
            </div>
        </div>
    );
}

export default TaskColumn;