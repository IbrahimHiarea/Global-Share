//import react
import React, { useEffect, useReducer } from 'react';

//import redux
import { useDispatch , useSelector } from 'react-redux';
import { addManyApplication , selectAllApplication , selectApplicationStatus } from '../ApplicationSlice';

//import components
import Error from '../../../common/components/Error/Error';
import ApplicationFilterBar from '../ApplicationFilterBar/ApplicationFilterBar';
import DashboardTable from '../../../common/components/Dashboard/DashboardTable/DashboardTable';

//import style
import style from './ApplicationPage.module.css';

const columns = [
    {
        name: 'id',
        key: 'id',
        type: 'id',
    },
    {
        name: 'vacancy id',
        key: 'vacancyId',
        type: 'id'
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
];

const fakeData = [
    {
        id: 1,
        vacancyId: 1,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'Applied'
    },
    {
        id: 2,
        vacancyId: 2,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'HR Approved'
    },
    {
        id: 3,
        vacancyId: 3,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'Orch Approved'
    },
    {
        id: 4,
        vacancyId: 4,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'Refused'
    },
    {
        id: 5,
        vacancyId: 5,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'HR-Interview Approved'
    },
    {
        id: 6,
        vacancyId: 6,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'HR-Interview Approved'
    },
    {
        id: 7,
        vacancyId: 7,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'Done'
    },
    {
        id: 8,
        vacancyId: 8,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'Applied'
    },
    {
        id: 9,
        vacancyId: 9,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'Applied'
    },
    {
        id: 10,
        vacancyId: 10,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'Applied'
    },
    {
        id: 11,
        vacancyId: 11,
        position: 'Specialist Android Developer',
        squad: 'Radioactive',
        status: 'Applied'
    },
];

function ApplicationPage() {

    const dispatch = useDispatch();

    const data = useSelector(selectAllApplication);
    const status = useSelector(selectApplicationStatus);

    //TODO::
    const onChangePage = (page , totalRow) => {
        console.log(page , totalRow);
    }

    //TODO::
    const onChangeRowsPerPage = (currentRowsPerPage, currentPage) => {
        console.log( currentRowsPerPage , currentPage);
    }

    useEffect(() => {
        dispatch(addManyApplication(fakeData));
    } , []);

    if(status==='failed'){
        return (
            <div className={style['application-page']}>
                <Error />
            </div>
        );
    }

    return (
        <div className={style["application-page"]}>
            <h1 className={style['application-title']}>applications</h1>

            <ApplicationFilterBar />

            <DashboardTable 
                columns={columns}
                data={data}
                pending={status==='loading' || status ==='idle' ? true : false}
                rowClick={(row) => console.log(row)}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
            />
            
        </div>
    );
}

export default ApplicationPage;