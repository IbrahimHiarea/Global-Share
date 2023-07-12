//import react
import React, { useEffect , useReducer} from 'react';
import { useForm } from 'react-hook-form';
import { DragDropContext } from 'react-beautiful-dnd';

//import redux
import { useSelector , useDispatch} from 'react-redux';
import { selectTaskStatus , selectTasks , fetchTasksBySquad } from '../taskSlice';

// import components 
import TaskFilterBar from '../TaskFilterBar/TaskFilterBar';
import TaskColumn from '../TaskColumn/TaskColumn';
import PopUp from '../../../common/components/PopUp/PopUp';
import { AddStatusButton } from '../TaskColHeader/TaskColHeader';

//import style
import style from './TaskPage.module.css';

function TaskPage (){
    const {control ,register , watch , formState , reset} = useForm({
        defaultValues:{
            search: '',
            member: '',
            priorities: '',
            complexities: '',
        }
    });
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchTasksBySquad(1));
    } , []);

    return (
        <div className={style['task-page']}>
            <TaskFilterBar 
                register={register}
                formState={formState}
                reset={reset}
                control={control}
            />

            {/* <div className={style['task-page-body']}>
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
                <AddStatusButton>
                    Add New
                </AddStatusButton>
            </div> */}
        </div>
    );
}

export default TaskPage;