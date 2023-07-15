//import react
import React, { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';

//import redux
import { useDispatch , useSelector } from 'react-redux';
import { addManyVolunteer , selectAllVolunteer , selectVolunteerStatus} from '../VolunteerSlice';

//import components
import DashboardTable from '../../../common/components/Dashboard/DashboardTable/DashboardTable';
import Error from '../../../common/components/Error/Error';
import PopUp from '../../../common/components/PopUp/PopUp';
import InputField from '../../../common/components/Inputs/InputField/InputField';
import SelectInputField from "../../../common/components/Inputs/SelectInputField/SelectInputField";
import Button from '../../../common/components/Inputs/Button/Button';
import AddVolunteer from '../PopUpComponents/AddVolunteer/AddVolunteer';

//import style 
import style from './VolunteerPage.module.css';
import DeleteVolunteer from '../PopUpComponents/DeleteVolunteer/DeleteVolunteer';

// import Icons
import { FaPlus } from "react-icons/fa";


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

const filterOptions ={
    squads: ['Radioactive' , 'Hamdi'],
    positions : ['Android Developer' , 'react Developer'],
    levels : ['Specialist' , 'Expert' , 'CM'],
    statues : ['active' , 'freeze' , 'left']
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

    const {control ,register , watch , formState , reset} = useForm({
        defaultValues:{
            search: '',
            squads: '',
            positions: '',
            levels: '',
            statues: '',
        }
    });

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
        // <div className={style['volunteer-page']}>
        //     <h1 className={style['volunteers-title']}>Volunteers</h1>

        //     <div className={style['filter-bar']}>
        //         <InputField 
        //             type='text'
        //             name='search'
        //             placeholder='Search...'
        //             width='277px'
        //             height='40px'
        //             control={register('search')}
        //         />
        //         <SelectInputField
        //             width='140px'
        //             height='40px'
        //             name='squads'
        //             placeholder='All Squads'
        //             options={filterOptions.squads}
        //             control={control}
        //         />
        //         <SelectInputField
        //             width='140px'
        //             height='40px'
        //             name='positions'
        //             placeholder='All Positions'
        //             options={filterOptions.positions}
        //             control={control}
        //         />
        //         <SelectInputField
        //             width='140px'
        //             height='40px'
        //             name='levels'
        //             placeholder='All Levels'
        //             options={filterOptions.levels}
        //             control={control}
        //         />
        //         <SelectInputField
        //             width='140px'
        //             height='40px'
        //             name='statues'
        //             placeholder='All Statues'
        //             options={filterOptions.statues}
        //             control={control}
        //         />
        //         <Button width="140px" height="40px">
        //             <FaPlus size="15px" color='white'/> Add Volunteer
        //         </Button>
        //         <span className={style.reset} onClick={() => {
        //             reset(formState.defaultValues)
        //         }}>
        //             Clear
        //         </span>
        //     </div>

        //     <DashboardTable 
        //         columns={columns}
        //         data={data}
        //         pending={status==='loading' || status==='idle' ? true : false}
        //         rowClick={rowClick}
        //         handleDelete={handleDelete}
        //         handleEdit={handleEdit}
        //         onChangePage={onChangePage}
        //         onChangeRowsPerPage={onChangeRowsPerPage}
        //     />  

        //     <PopUp open={popUpOption.isOpen} handleClose={() => popUpDispatch({type:'close'})} index={popUpOption.index}>
        //         <DeleteVolunteer id={popUpOption.id}/>
        //     </PopUp>
        // </div>
        <AddVolunteer>
            
        </AddVolunteer>
    );
}

export default VolunteerPage;