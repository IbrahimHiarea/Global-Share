//import react
import React, { useEffect , useReducer} from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

//import task Slice
import { selectTaskStatus , selectTasks} from '../taskSlice';

// import components 
import TaskFilterBar from '../TaskFilterBar/TaskFilterBar';
import TaskColumn from '../TaskColumn/TaskColumn';
import PopUp from '../../../common/components/PopUp/PopUp';
import { AddStatusButton } from '../TaskColHeader/TaskColHeader';

//import style
import style from './TaskPage.module.css';

const initPopup = {open: false , node: <></>};
const popUpReducer = (oldState , action) =>{
    switch(action.type){
        case 'open':
            return {
                ...oldState,
                open: true,
                node: action.payload
            }
        case 'close': 
            return {
                ...oldState,
                open: false
            }
        default:
            return oldState;
    }
}

function TaskPage (){
    const {control ,register , watch , formState , reset} = useForm({
        defaultValues:{
            search: '',
            member: '',
            priorities: '',
            complexities: '',
        }
    })

    const [showPopUp , dispatchPopUp] = useReducer(popUpReducer , initPopup);
    
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
                control={control}
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
                                dispatchPopUp={dispatchPopUp}
                            />
                        ))
                    }
                </DragDropContext>
                <AddStatusButton 
                    dispatchPopUp={dispatchPopUp}
                >
                    Add New
                </AddStatusButton>
            </div>

            <PopUp open={showPopUp.open} close={dispatchPopUp}>
                {showPopUp.node}
            </PopUp>
        </div>
    );
}

export default TaskPage;