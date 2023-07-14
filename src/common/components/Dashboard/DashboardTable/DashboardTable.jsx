//import react
import React from 'react';

//import components
import DataTable from 'react-data-table-component';
import { HeaderCell, IdCell, NextArrow, NormalCell, PreviousArrow, StatusCell } from '../DashboardCell/DashboardCell';
import Button from '../../Inputs/Button/Button';

// import icon & image
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import {ReactComponent as NoData} from '../../../../assets/icons/noData.svg';

// import style
import style from './DashboardTable.module.css';
import { CircularProgress } from '@mui/material';

const formatCell = (value , type) => {
    if(type==='id') return <IdCell id={value} />;
    else if(type==='normal') return <NormalCell value={value} />
    else if(type==='status') return <StatusCell status={value} />
    return value;
}

const iconButton = (row , key , onClick) => {
    let icon  = <></>;
    
    if(key==='edit') icon = <FiEdit size="17px" color='var(--natural-alpha-1)' className={style['edit-icon']}/>;
    else if(key==='delete') icon = <BsTrash size="17px" color='var(--natural-alpha-1)' className={style['delete-icon']}/>;

    return <Button 
        onClick={() => onClick(row)} 
        backgroundColor="transparent"
    >
        {icon}
    </Button>;
}

function DashboardTable ({
        columns , data , 
        rowClick , pending ,
        handleDelete , handleEdit , onChangePage ,
        onChangeRowsPerPage
    }){

    const initColumns = columns.map((col) => {
        if(col.type!=='button') return {
            name: <HeaderCell title={col.name}/>,
            sortable: true,
            selector: row => row[col.key],
            format: (row) => {
                if(col.key==='firstName') return formatCell(row.firstName+" "+row.lastName , col.type);
                return formatCell(row[col.key] , col.type)
            }
        }
        return {
            selector: (row) => row[col.key],
            format: (row) => iconButton(row , col.key , col.key==='delete' ? handleDelete : handleEdit),
            ignoreRowClick: true,
            button: true
        }
    });

    return (
        <DataTable
            columns={initColumns}
            data={data}
            responsive
            highlightOnHover
            pointerOnHover
            noDataComponent = {<EmptyTable />}
            // disabled
            // keyField
            onRowClicked={rowClick}
            progressPending={pending}
            progressComponent={<ProgressTable />}
            pagination
            paginationComponentOptions={
                {
                    rowsPerPageText: 'Showing',
                    selectAllRowsItem: true,
                }
            }
            paginationIconFirstPage={null}
            paginationIconLastPage={null}
            paginationIconNext={<NextArrow />}
            paginationIconPrevious={<PreviousArrow />}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            paginationRowsPerPageOptions={[10 , 20 , 30]}
        />
    );
}


const EmptyTable = () => {
    return (
        <div className={style['empty-table']}>
            <NoData width='300px' height='300px'/>
            <p>no result found :(</p>
        </div>
    );
}

const ProgressTable = () => {
    return (
        <div className={style['progress-table']}>
            <CircularProgress
                size='35px' 
                thickness={2} 
                sx={{
                    color: 'var(--primary-main)',
                }}
            />
        </div>
    );
}

export default DashboardTable;