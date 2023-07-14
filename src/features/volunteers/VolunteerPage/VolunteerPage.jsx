//import react
import React, { useEffect, useReducer } from 'react';

//import redux
import { useDispatch , useSelector } from 'react-redux';
import { addManyVolunteer , selectAllVolunteer , selectVolunteerStatus} from '../VolunteerSlice';

//import components
import DashboardTable from '../../../common/components/Dashboard/DashboardTable/DashboardTable';
import Error from '../../../common/components/Error/Error';
import PopUp from '../../../common/components/PopUp/PopUp';

//import style 
import style from './VolunteerPage.module.css';
import DeleteVolunteer from '../PopUpComponents/DeleteVolunteer/DeleteVolunteer';

const columns = [
    {
        name: 'id',
        key: 'id',
        type: 'id',
    },
    {
        name: 'full name',
        key: 'firstName',
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
        key: 'gsStatus',
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
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "left",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
    },
    {
        id: 2,
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "freeze",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
    },
    {
        id: 3,
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "left",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
    },
    {
        id: 4,
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "active",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
    },
    {
        id: 5,
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "active",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
    },
    {
        id: 6,
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "active",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
    },
    {
        id: 7,
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "active",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
    },
    {
        id: 8,
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "active",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
    },
    {
        id: 9,
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "left",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
    },
    {
        id: 10,
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "active",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
    },
    {
        id: 11,
        email: "twfekajeneh@gmail.com",
        phoneNumber: "0988311840",
        firstName: "Twfek",
        lastName: "Ajeneh",
        additionalEmail: "",
        middleName: "Moustafa",
        arabicFullName: "توفيق عجينة",
        appointlet: "",
        bio: "",
        gsStatus: "active",
        joinDate: "2000-1-1",
        positionId: "",
        position: "React Dev",
        squad: 'starter'
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
            id: action.id,
            isOpen: true,
            index: 2,
        }
        case 'close': return {
            ...initPopUpOption,
        }
        default:
            return state;
    }
}

function VolunteerPage(){
    const [popUpOption , popUpDispatch] = useReducer(popReducer , initPopUpOption);
    const dispatch = useDispatch();

    const data = useSelector(selectAllVolunteer);
    const status = useSelector(selectVolunteerStatus);

    const handleDelete = (row) => {
        popUpDispatch({type:'delete' , id: row.id});
    }
    
    const handleEdit = (row) => {
        popUpDispatch({type:'edit' , id: row.id});
    }

    const handleAdd = () => {
        popUpDispatch({type:'add'});
    }

    //TODO::
    const rowClick = (row) => {
        console.log(row)
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
        dispatch(addManyVolunteer(fakeData));
    } , []);


    if(status==='failed'){
        return (
            <div className={style['volunteer-page']}>
                <Error />
            </div>
        );
    }

    return (
        <div className={style['volunteer-page']}>
            <h1 className={style['volunteers-title']}>Volunteers</h1>

            <div className={style['filter-bar']}>

            </div>

            <DashboardTable 
                columns={columns}
                data={data}
                pending={status==='loading' || status==='idle' ? true : false}
                rowClick={rowClick}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
            />  

            <PopUp open={popUpOption.isOpen} handleClose={() => popUpDispatch({type:'close'})} index={popUpOption.index}>
                <DeleteVolunteer id={popUpOption.id}/>
            </PopUp>
        </div>
    );
}

export default VolunteerPage;