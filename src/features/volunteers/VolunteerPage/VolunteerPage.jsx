//import react
import React from 'react';

//import components
import DashboardTable from '../../../common/components/Dashboard/DashboardTable/DashboardTable';

//import style 
import style from './VolunteerPage.module.css';

const columns = [
    {
        name: 'id',
        key: 'id',
        type: 'id',
    },
    {
        name: 'full name',
        key: 'name',
        type: 'normal'
    },
    {
        name: 'squad',
        key: 'squad',
        type: 'normal'
    },
    {
        name: 'position',
        key: 'position',
        type: 'normal'
    },
    {
        name: 'level',
        key: 'level',
        type: 'normal'
    },
    {
        name: 'status',
        key: 'status',
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

const data = [
    {
        id: 1,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'freeze',
    },
    {
        id: 2,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'freeze',
    },
    {
        id: 3,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'freeze',
    },
    {
        id: 4,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'left',
    },
    {
        id: 5,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'active',
    },
    {
        id: 6,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'active',
    },
    {
        id: 7,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'active',
    },
    {
        id: 8,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'active',
    },
    {
        id: 9,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'active',
    },
    {
        id: 10,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'active',
    },
    {
        id: 11,
        name: 'Ahmad Al-Shahal',
        squad: 'Radioactive',
        position: 'Android Developer',
        level: 'Specialist',
        status: 'active',
    },
]

function VolunteerPage(){

    const handleDelete = (row) => {
        console.log("delete");
        console.log(row);
    }
    
    const handleEdit = (row) => {
        console.log("edit");
        console.log(row);
    }

    const rowClick = (row) => {
        console.log(row)
    }

    const onChangePage = (page , totalRow) => {
        console.log(page , totalRow);
    }

    const onChangeRowsPerPage = (currentRowsPerPage, currentPage) => {
        console.log( currentRowsPerPage , currentPage);
    }

    return (
        <div className={style['volunteer-page']}>
            <h1 className={style['volunteers-title']}>Volunteers</h1>

            <div className={style['filter-bar']}>

            </div>

            <DashboardTable 
                columns={columns}
                data={data}
                pending={false}
                rowClick={rowClick}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
            />  
        </div>
    );
}

export default VolunteerPage;