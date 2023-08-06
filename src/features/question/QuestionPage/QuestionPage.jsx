//import react
import React, { useEffect, useReducer } from 'react';

//import redux
import { useDispatch , useSelector } from 'react-redux';
import {addManyQuestion , selectQuestionStatus , selectAllQuestion} from '../questionSlice';

//import components
import Error from '../../../common/components/Error/Error';
import DashboardTable from '../../../common/components/Dashboard/DashboardTable/DashboardTable';
import PopUp from '../../../common/components/PopUp/PopUp';
import QuestionFilterBar from '../QuestionFilterBar/QuestionFilterBar';
import DeleteQuestion from '../PopUpComponents/DeleteQuestion/DeleteQuestion';
import AddQuestion from '../PopUpComponents/AddQuestion/AddQuestion';
import EditQuestion from '../PopUpComponents/EditQuestion/EditQuestion';

//import static data
import { questionTypeData } from '../../../common/utils/selectorData';

//import style
import style from './QuestionPage.module.css';

const columns = [
    {
        name: 'id',
        keys: ['id'],
        type: 'id',
    },
    {
        name: 'question',
        keys: ['text'],
        type: 'normal'
    },
    {
        name: 'type',
        keys: ['type'],
        type: 'normal'
    },
    {
        keys: ['edit'],
        type: 'button',
    },
    {
        keys: ['delete'],
        type: 'button',
    }
];

const fakeData = [
    {
        id: 1,
        text: 'what do you want',
        type: questionTypeData.checkbox, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 2,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 3,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 4,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 5,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 6,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 7,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 8,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 9,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 9,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 10,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
    {
        id: 11,
        text: 'what do you want',
        type: questionTypeData.short, //type of questions
        options: ['twfek' , 'ahmad' , 'ibrahim'] 
    },
];

const initPopUpOption = {
    id: 0,
    isOpen: false,
    index: 0,
};

const popUpReducer = (state , action) => {
    switch(action.type){
        case 'delete': return {
            ...initPopUpOption,
            id: action.id,
            isOpen: true,
            index: 0
        }
        case 'edit': return {
            ...initPopUpOption,
            id: action.id,
            isOpen: true,
            index: 1,
        }
        case 'add': return {
            ...initPopUpOption,
            isOpen: true,
            index: 2,
        }
        case 'close': return {
            ...state,
            isOpen: false
        }
        default:
            return state;
    }
};

function QuestionPage(){
    const [popUpOption , popUpDispatch] = useReducer(popUpReducer , initPopUpOption);
    const dispatch = useDispatch();

    const data = useSelector(selectAllQuestion);
    const status = useSelector(selectQuestionStatus);

    const handleAdd = () => {
        popUpDispatch({type: 'add'});
    }

    //TODO::
    const onChangePage = (page , totalRow) => {
        console.log(page, totalRow);
    }

    useEffect(() => {
        dispatch(addManyQuestion(fakeData));
    } , []);

    if(status==='failed'){
        return (
            <div className={style['question-page']}>
                <Error />
            </div>
        );
    }

    return (
        <div className={style['question-page']}>
            <h1 className={style['question-title']}>questions</h1>

            <QuestionFilterBar handleAdd={handleAdd}/>

            <DashboardTable 
                columns={columns}
                data={data}
                pending={status==='loading' || status ==='idle' ? true : false}
                rowClick={(row) => console.log(row)}
                handleDelete={(row) => popUpDispatch({type:'delete' , id: row.id})}
                handleEdit={(row) => popUpDispatch({type:'edit' , id: row.id})}
                onChangePage={onChangePage}
            />

            <PopUp open={popUpOption.isOpen} handleClose={() => popUpDispatch({type:'close'})} index={popUpOption.index}>
                <DeleteQuestion id={popUpOption.id} handleClose={() => popUpDispatch({type:'close'})}/>
                <EditQuestion id={popUpOption.id} handleClose={() => popUpDispatch({type:'close'})}/>
                <AddQuestion handleClose={() => popUpDispatch({type:'close'})}/>
            </PopUp>
        </div>
    );
}

export default QuestionPage