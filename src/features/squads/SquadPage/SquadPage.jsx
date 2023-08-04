//import react
import React, { useEffect, useReducer } from 'react';

//import redux
import { useDispatch , useSelector } from 'react-redux';
import { addManySquad , selectAllSquad , selectSquadStatus } from '../squadSlice';

//import components
import Error from '../../../common/components/Error/Error';
import SquadFilterBar from '../SquadFilterBar/SquadFilterBar';
import DashboardTable from '../../../common/components/Dashboard/DashboardTable/DashboardTable';
import PopUp from '../../../common/components/PopUp/PopUp';
import DeleteSquad from '../PopUpComponents/DeleteSquad/DeleteSquad';
import AddSquad from '../PopUpComponents/AddSquad/AddSquad';
import EditSquad from '../PopUpComponents/EditSquad/EditSquad';

//import style
import style from './SquadPage.module.css';

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
        name: 'Social Media',
        gsName: 'Radioactive',
        description: 'Radioactive Radioactive Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
    },
    {
        id: 2,
        name: 'fasg Media',
        gsName: 'Radioactive',
        description: 'Radioactive gasg Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
    },
    {
        id: 3,
        name: 'Social Media',
        gsName: 'Radioactive',
        description: 'Radioactive Radioactive Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
    },
    {
        id: 4,
        name: 'Social Media',
        gsName: 'Radioactive',
        description: 'Radioactive Radioactive Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
    },
    {
        id: 5,
        name: 'Social Media',
        gsName: 'Radioactive',
        description: 'Radioactive Radioactive Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
    },
    {
        id: 6,
        name: 'Social Media',
        gsName: 'Radioactive',
        description: 'Radioactive Radioactive Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
    },
    {
        id: 7,
        name: 'Social Media',
        gsName: 'Radioactive',
        description: 'Radioactive Radioactive Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
    },
    {
        id: 8,
        name: 'Social Media',
        gsName: 'Radioactive',
        description: 'Radioactive Radioactive Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
    },
    {
        id: 9,
        name: 'Social Media',
        gsName: 'Radioactive',
        description: 'Radioactive Radioactive Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
    },
    {
        id: 10,
        name: 'Social Media',
        gsName: 'Radioactive',
        description: 'Radioactive Radioactive Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
    },
    {
        id: 11,
        name: 'Social Media',
        gsName: 'Radioactive',
        description: 'Radioactive Radioactive Radioactive Radioactive Radioactive Radioactive',
        imageUrl: '',
        positions: [],
        board: {}
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

function SquadPage(){
    const [popUpOption , popUpDispatch] = useReducer(popUpReducer , initPopUpOption);
    const dispatch = useDispatch();

    const data = useSelector(selectAllSquad);
    const status = useSelector(selectSquadStatus);

    const handleAdd = () => {
        popUpDispatch({type:'add'});
    }

    //TODO::
    const onChangePage = (page , totalRow) => {
        console.log(page , totalRow);
    }

    useEffect(() => {
        dispatch(addManySquad(fakeData));
    } , []);

    if(status==='failed'){
        return (
            <div className={style['squad-page']}>
                <Error />
            </div>
        );
    }

    return (
        <div className={style['squad-page']}>
            <h1 className={style['squad-title']}>squads</h1>

            <SquadFilterBar handleAdd={handleAdd}/>

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
                <DeleteSquad id={popUpOption.id}  handleClose={() => popUpDispatch({type:'close'})}/>
                <EditSquad id={popUpOption.id}  handleClose={() => popUpDispatch({type:'close'})}/>
                <AddSquad handleClose={() => popUpDispatch({type:'close'})}/>
            </PopUp>
        </div>
    );
}

export default SquadPage;