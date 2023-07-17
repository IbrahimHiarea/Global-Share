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
        key: 'id',
        type: 'id',
    },
    {
        name: 'name',
        key: 'name',
        type: 'normal'
    },
    {
        name: 'gs name',
        key: 'gsName',
        type: 'normal'
    },
    {
        name: 'level',
        key: 'gsLevel',
        type: 'normal'
    },
    {
        name: 'squad',
        key: 'squad',
        type: 'normal'
    },
    {
        name: 'weekly hours',
        key: 'weeklyHours',
        type: 'status'
    },
    {
        key: 'edit',
        type: 'button',
    },
    {
        key: 'delete',
        type: 'button',
    }
]

const fakeData = [
    {
        id: "1",
        name: "Android Developer",
        gsName : "Androidy",
        jobDescription: "Develop and maintaine android applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "2",
        name: "Backend Developer",
        gsName : "Backendy",
        jobDescription : "Develop and maintaine server-side applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "3",
        name: "Backend Developer",
        gsName : "Backendy",
        jobDescription : "Develop and maintaine server-side applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "4",
        name: "Backend Developer",
        gsName : "Backendy",
        jobDescription : "Develop and maintaine server-side applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "5",
        name: "Backend Developer",
        gsName : "Backendy",
        jobDescription : "Develop and maintaine server-side applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "6",
        name: "Backend Developer",
        gsName : "Backendy",
        jobDescription : "Develop and maintaine server-side applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "7",
        name: "Backend Developer",
        gsName : "Backendy",
        jobDescription : "Develop and maintaine server-side applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "8",
        name: "Android Developer",
        gsName : "Androidy",
        jobDescription: "Develop and maintaine android applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "9",
        name: "Android Developer",
        gsName : "Androidy",
        jobDescription: "Develop and maintaine android applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "10",
        name: "Android Developer",
        gsName : "Androidy",
        jobDescription: "Develop and maintaine android applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "11",
        name: "Android Developer",
        gsName : "Androidy",
        jobDescription: "Develop and maintaine android applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
    {
        id: "12",
        name: "Android Developer",
        gsName : "Androidy",
        jobDescription: "Develop and maintaine android applications",
        weeklyHours: "20",
        gsLevel: "SPECIALIST",
        squadId: "2",
        squad : "Radioactive"
    },
]

const initPopUpOption = {
    id: 0,
    isOpen: false,
    index: 0,
}

const popReducer = (state , action) => {
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

    const [popUpOption , popUpDispatch] = useReducer(popReducer , initPopUpOption);
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

    //TODO::
    const onChangeRowsPerPage = (currentRowsPerPage, currentPage) => {
        console.log( currentRowsPerPage , currentPage);
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
                onChangeRowsPerPage={onChangeRowsPerPage}
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