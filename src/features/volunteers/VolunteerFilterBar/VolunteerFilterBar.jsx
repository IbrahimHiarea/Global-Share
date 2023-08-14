//import react
import React from 'react';
import { useForm } from 'react-hook-form';

//import redux
import { useSelector , useDispatch} from 'react-redux';
import {selectVolunteerStatus , getVolunteers} from '../VolunteerSlice.js';
import { showMessage } from '../../snackBar/snackBarSlice.js';

//import components
import InputField from '../../../common/components/Inputs/InputField/InputField';
import Button from '../../../common/components/Inputs/Button/Button';
import SelectInputField from '../../../common/components/Inputs/SelectInputField/SelectInputField';
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';
import AsyncSelectInputField from '../../../common/components/Inputs/AsyncSelectInputField/AsyncSelectInputField.jsx';

//import icons & images
import { ImPlus } from 'react-icons/im';
import { FiSearch } from 'react-icons/fi';
import { RxReset } from 'react-icons/rx';

//import select request
import {getPositionDataBySquad, getSquadsData} from '../../../common/utils/selectorAPI.js';

//import static data
import { levelData, statusesData } from '../../../common/utils/selectorData.js';

//import style
import style from './VolunteerFilterBar.module.css';

function VolunteerFilterBar({ handleAdd }){
    const dispatch = useDispatch();
    const {control , register , formState , reset , handleSubmit , watch} = useForm({
        defaultValues:{
            search: '',
            squad: [],
            position: [],
            level: [],
            status: []
        }
    });

    const status = useSelector(selectVolunteerStatus);

    const handleReset = async () => {
        try{
            await dispatch(getVolunteers({search: '' , level: '' , squad: '' , position: '' , status: ''})).unwrap();
            reset(formState.defaultValues);
        }catch(error){
            if(error?.name==="ConditionError"){
                reset(formState.defaultValues);
                return;
            }
            dispatch(showMessage({message: error , severity: 2}));
        }
    }

    const onSubmit = async (values) => {
        const {search , level , squad , position , status} = values;
        try{
            await dispatch(getVolunteers({
                search,
                level: level?.map(item => item?.value?.toUpperCase()).join(','),
                squad: squad?.map(item => item.value).join(','),
                status: status?.map(item => item?.value?.toUpperCase()).join(','),
                position: position?.map(item => item.value).join(',')
            })).unwrap();
        }catch(error){
            if(error?.name==="ConditionError") return;
            dispatch(showMessage({message: error , severity: 2}));
        }
    }

    return (
        <div className={style['bar']}>
            <form className={style['filter-bar']} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    type='text'
                    name='search'
                    placeholder='Search...'
                    width='250px'
                    height='40px'
                    control={register('search')}
                />
                <SelectInputField
                    width='170px'
                    height='40px'
                    name='status'
                    placeholder='All statuses'
                    options={Object.values(statusesData)}
                    control={control}
                    isMulti={true}
                />
                <AsyncSelectInputField
                    width='200px'
                    height='40px'
                    name='squad'
                    placeholder='All squads'
                    defaultOptions={[]}
                    control={control}
                    isMulti={true}
                    callBack={(data) => getSquadsData({...data})}
                />
                <AsyncSelectInputField
                    width='200px'
                    height='40px'
                    name='position'
                    placeholder='All positions'
                    defaultOptions={[]}
                    control={control}
                    isMulti={true}
                    callBack=   {(data) => getPositionDataBySquad({...data , squadId: watch('squad')?.map(item => item.value).join(',') })}
                />
                <SelectInputField
                    width='190px'
                    height='40px'
                    name='level'
                    placeholder='All levels'
                    options={Object.values(levelData)}
                    control={control}
                    isMulti={true}
                />
                <span className={style['bar-buttons']}>
                    <SubmitButton 
                        width='40px'
                        height='30px'
                        disabled={status==='loading' || status==='idle' ? true : false}
                    >
                        <FiSearch size='15px'/>
                    </SubmitButton>
                    <span 
                        className={style.reset} 
                        style={{
                            pointerEvents: (status==='loading' || status==='idle') ? 'none' : 'auto'
                        }}
                        onClick={handleReset}
                    >
                        <RxReset size='15px'/>    
                    </span>
                </span>
            </form>
            <div style={{marginBottom: '5px'}}>
                <Button width="150px" height="40px" onClick={handleAdd}>
                    <ImPlus size="13px" color='white'style={{marginRight: '8px'}}/> Add Volunteer
                </Button>
            </div>
        </div>
    )
}

export default VolunteerFilterBar