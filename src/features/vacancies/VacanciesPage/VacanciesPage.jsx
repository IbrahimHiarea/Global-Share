//import react
import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

//import redux
import { useDispatch , useSelector } from 'react-redux';
import { addManyVacancies , selectAllVacancies , selectVacanciesStatus } from '../VacanciesSlice';

//import components
import Error from '../../../common/components/Error/Error';
import VacanciesFilterBar from '../VacanciesFilterBar/VacanciesFilterBar';
import DashboardTable from '../../../common/components/Dashboard/DashboardTable/DashboardTable';
import PopUp from '../../../common/components/PopUp/PopUp';
import DeleteVacancies from '../PopUpComponents/DeleteVacancies/DeleteVacancies'

//import style
import style from './VacanciesPage.module.css';


const columns = [
    {
        name: 'id',
        key: 'id',
        type: 'id',
    },
    {
        name: 'Position',
        key: 'position',
        type: 'normal'
    },
    {
        name: 'Squad',
        key: 'squad',
        type: 'normal',
    },
    {
        name: 'status',
        key: 'status',
        type: 'recruitmentStatus'
    },
    {
        key: 'edit',
        type: 'button',
    },
    {
        key: 'delete',
        type: 'button',
    }
];

const fakeData = [
    {
        id: 1,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'open'
    },
    {
        id: 2,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'open'
    },
    {
        id: 3,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'closed'
    },
    {
        id: 4,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'closed'
    },
    {
        id: 5,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'open'
    },
    {
        id: 6,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'open'
    },
    {
        id: 7,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'closed'
    },
    {
        id: 8,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'open'
    },
    {
        id: 9,
        vacancyId: 9,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'open'
    },
    {
        id: 10,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'open'
    },
    {
        id: 11,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'closed'
    },
];


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

function VacanciesPage(){
    const [popUpOption , popUpDispatch] = useReducer(popUpReducer , initPopUpOption);
    const dispatch = useDispatch();

    const data = useSelector(selectAllVacancies);
    const status = useSelector(selectVacanciesStatus);

    const nav = useNavigate();

    const handleAdd = () => {
        popUpDispatch({type:'add'});
        nav('/dashboard/vacancies/add');
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
        dispatch(addManyVacancies(fakeData));
    } , []);

    if(status==='failed'){
        return (
            <div className={style['vacancies-page']}>
                <Error />
            </div>
        );
    }

    return (
        <div className={style['vacancies-page']}>
            <h1 className={style['vacancies-title']}>Vacancies</h1>

            <VacanciesFilterBar handleAdd={handleAdd}/>

            <DashboardTable 
                columns={columns}
                data={data}
                pending={status==='loading' || status ==='idle' ? true : false}
                rowClick={(row) => console.log(row)}
                handleDelete={(row) => popUpDispatch({type:'delete' , id: row.id})}
                handleEdit={(row) => popUpDispatch({type:'edit' , id: row.id})}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
            />
            
            <PopUp open={popUpOption.isOpen} handleClose={() => popUpDispatch({type:'close'})} index={popUpOption.index}>
                <DeleteVacancies id={popUpOption.id}  handleClose={() => popUpDispatch({type:'close'})}/>
            </PopUp>
        </div>
    );
}

export default VacanciesPage;