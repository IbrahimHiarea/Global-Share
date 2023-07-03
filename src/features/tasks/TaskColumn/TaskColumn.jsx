// import react
import React from "react";
import { Droppable , Draggable } from 'react-beautiful-dnd';

//import components
import TaskColHeader from "../TaskColHeader/TaskColHeader";

// import style 
import style from './TaskColumn.module.css';
import TaskCard from "../TaskCard/TaskCard";

function TaskColumn({statusId , statusName , tasks , dispatchPopUp}){
    return (
        <div className={style['task-column']}>
            <TaskColHeader>{statusName}</TaskColHeader>
            <Droppable isDropDisabled={false} droppableId={statusId+''} type="tasks">
                {(provided) => 
                    <div    
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={style['task-column-body']}
                    >
                        {
                            tasks?.map((task , index) => (
                                <Draggable 
                                    key={task.id}
                                    draggableId={task.id+''} 
                                    index={index}
                                >
                                    {(provide) => (
                                        <div
                                            ref={provide.innerRef}
                                            {...provide.draggableProps}
                                            {...provide.dragHandleProps}
                                        >
                                            <TaskCard 
                                                key={task.id} 
                                                task={task} 
                                                dispatchPopUp={dispatchPopUp}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        }
                        {provided.placeholder}
                    </div>
                }
            </Droppable>
        </div>
    );
}

export default TaskColumn;