//import react
import React, { useEffect , useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

//import task Slice
import { selectTaskStatus , selectTasks} from '../taskSlice';

// import components 
import TaskFilterBar from '../TaskFilterBar/TaskFilterBar';
import TaskColumn from '../TaskColumn/TaskColumn';

//import style
import style from './TaskPage.module.css';

function TaskPage (){
    const { register , watch , formState , reset} = useForm({
        defaultValues:{
            search: '',
            member: '',
            priorities: '',
            complexities: '',
        }
    })

    const taskStatus = useSelector(selectTaskStatus);
    const tasks = useSelector(selectTasks);

    useEffect(() => {
        const temp =  watch(values => {
            console.log(values);    
        });
        return () => temp.unsubscribe();
    } , [watch]);

    return (
        <div className={style['task-page']}>
            <TaskFilterBar 
                register={register}
                formState={formState}
                reset={reset}
            />

            <div className={style['task-page-body']}>
                <DragDropContext>
                    {
                        taskStatus.map(({id , name}) => (
                            <TaskColumn
                                key={name}
                                statusId={id}
                                statusName={name}
                                tasks={tasks[name]}
                            />
                        ))
                    }
                </DragDropContext>
                <TaskColumn 
                    statusName='Add New'
                    isAdd
                />
            </div>
        </div>
    );
}

export default TaskPage;