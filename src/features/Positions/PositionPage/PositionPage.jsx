//import react
import React, { useEffect, useReducer } from 'react';

//import redux
import { useDispatch , useSelector } from 'react-redux';
import { addManyPosition , selectAllPosition , selectPositionStatus} from '../PositionSlice';

//import components
import DashboardTable from '../../../common/components/Dashboard/DashboardTable/DashboardTable';
import Error from '../../../common/components/Error/Error';
import PopUp from '../../../common/components/PopUp/PopUp';
import DeletePosition from '../PopUpComponents/DeletePosition/DeletePosition';
import PositionFilterBar from '../PositionFilterBar/PositionFilterBar';
import EditPosition from '../PopUpComponents/EditPosition/EditPosition';
import AddPosition from '../PopUpComponents/AddPosition/AddPosition';

//import style 
import style from './PositionPage.module.css';

const columns = [
    {
        name: 'id',
        keys: ['id'],
        type: 'id',
    },
    {
        name: 'name',
        keys: ['name'],
        type: 'normal'
    },
    {
        name: 'gs name',
        keys: ['gsName'],
        type: 'normal'
    },
    {
        name: 'level',
        keys: ['gsLevel'],
        type: 'normal'
    },
    {
        name: 'squad',
        keys: ['squad' , 'name'],
        type: 'normal'
    },
    {
        name: 'weekly hours',
        keys: ['weeklyHours'],
        type: 'colored'
    },
    {
        keys: ['edit'],
        type: 'button',
    },
    {
        keys: ['delete'],
        type: 'button',
    }
]

const fakeData = [
    {
        id: 1,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 11,
        gsLevel: 'Specialist',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    {
        id: 2,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 12,
        gsLevel: 'intern',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    {
        id: 3,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 11,
        gsLevel: 'Specialist',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    {
        id: 4,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 11,
        gsLevel: 'Specialist',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    {
        id: 5,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 11,
        gsLevel: 'Specialist',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    {
        id: 6,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 11,
        gsLevel: 'Specialist',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    {
        id: 7,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 11,
        gsLevel: 'Specialist',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    {
        id: 8,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 11,
        gsLevel: 'Specialist',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    {
        id: 9,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 11,
        gsLevel: 'Specialist',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    {
        id: 10,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 11,
        gsLevel: 'Specialist',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    {
        id: 11,
        name: 'Android Developer',
        gsName: 'Kotlin Hero',
        jobDescription: '',
        weeklyHours: 11,
        gsLevel: 'Specialist',
        squadId: 0,
        squad: {
            name: 'Radioactive'
        }, //squad model
        users: [],
    },
    
]

const initPopUpOption = {
    id: 0,
    isOpen: false,
    index: 0,
}

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
}

function PositionPage() {
    const [popUpOption , popUpDispatch] = useReducer(popUpReducer , initPopUpOption);
    const dispatch = useDispatch();

    const data = useSelector(selectAllPosition);
    const status = useSelector(selectPositionStatus);

    const handleAdd = () => {
        popUpDispatch({type:'add'});
    }

    //TODO::
    const onChangePage = (page , totalRow) => {
        console.log(page , totalRow);
    }


    useEffect(() => {
        dispatch(addManyPosition(fakeData));
    } , []);


    if(status==='failed'){
        return (
            <div className={style['position-page']}>
                <Error />
            </div>
        );
    }

    return (
        <div className={style['position-page']}>
            <h1 className={style['positions-title']}>positions</h1>

            <PositionFilterBar handleAdd={handleAdd}/>

            <DashboardTable 
                columns={columns}
                data={data}
                pending={status==='loading' || status==='idle' ? true : false}
                rowClick={(row) => console.log(row)}
                handleDelete={(row) => popUpDispatch({type:'delete' , id: row.id})}
                handleEdit={(row) => popUpDispatch({type:'edit' , id: row.id})}
                onChangePage={onChangePage}
            />  

            <PopUp open={popUpOption.isOpen} handleClose={() => popUpDispatch({type:'close'})} index={popUpOption.index}>
                <DeletePosition id={popUpOption.id} handleClose={() => popUpDispatch({type:'close'})}/>
                <EditPosition id={popUpOption.id} handleClose={() => popUpDispatch({type:'close'})}/>
                <AddPosition handleClose={() => popUpDispatch({type:'close'})}/>
            </PopUp>
        </div>
    );
}

export default PositionPage;