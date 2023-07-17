//import react
import React, { useEffect, useReducer } from 'react';

//import redux
import { useDispatch , useSelector } from 'react-redux';
import { addManyEmail , selectAllEmail , selectEmailStatus} from '../EmailSlice';

//import components
import DashboardTable from '../../../common/components/Dashboard/DashboardTable/DashboardTable';
import Error from '../../../common/components/Error/Error';
import PopUp from '../../../common/components/PopUp/PopUp';
import DeleteEmail from '../PopUpComponents/DeleteEmail/DeleteEmail';
import EmailFilterBar from '../EmailFilterBar/EmailFilterBar';
import EditEmail from '../PopUpComponents/EditEmail/EditEmail';
import AddEmail from '../PopUpComponents/AddEmail/AddEmail';

//import style 
import style from './EmailPage.module.css';

const columns = [
    {
        name: 'id',
        key: 'id',
        type: 'id',
    },
    {
        name: 'subject',
        key: 'subject',
        type: 'normal'
    },
    {
        name: 'next recruitment status',
        key: 'nextRecruitmentStatus',
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
        id: 1,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "HR Approved",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 2,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "Refused",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 3,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "Refused",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 4,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "Done",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 5,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "HR Approved",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 6,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "HR Approved",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 7,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "HR Approved",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 8,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "HR Approved",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 9,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "HR Approved",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 10,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "HR Approved",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 11,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "HR Approved",
        cc : "Hamdi",
        body: "Hamdi is a good person"
    },
    {
        id: 12,
        subject: "Volunteering Role",
        nextRecruitmentStatus : "HR Approved",
        cc : "Hamdi",
        body: "Hamdi is a good person"
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

function EmailPage() {

    const [popUpOption , popUpDispatch] = useReducer(popReducer , initPopUpOption);
    const dispatch = useDispatch();

    const data = useSelector(selectAllEmail);
    const status = useSelector(selectEmailStatus);

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
        dispatch(addManyEmail(fakeData));
    } , []);


    if(status==='failed'){
        return (
            <div className={style['email-page']}>
                <Error />
            </div>
        );
    }

    return (
        <div className={style['email-page']}>
            <h1 className={style['emails-title']}>emails</h1>

            <EmailFilterBar handleAdd={handleAdd}/>

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
                <DeleteEmail id={popUpOption.id} handleClose={() => popUpDispatch({type:'close'})}/>
                <EditEmail id={popUpOption.id} handleClose={() => popUpDispatch({type:'close'})}/>
                <AddEmail handleClose={() => popUpDispatch({type:'close'})}/>
            </PopUp>
        </div>
    );
}

export default EmailPage;