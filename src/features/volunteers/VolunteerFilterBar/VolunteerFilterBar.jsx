//import react
import React from 'react';
import { useForm } from 'react-hook-form';

//import redux
import { useSelector } from 'react-redux';
import {selectVolunteerStatus} from '../VolunteerSlice.js'

//import components
import InputField from '../../../common/components/Inputs/InputField/InputField';
import Button from '../../../common/components/Inputs/Button/Button';
import SelectInputField from '../../../common/components/Inputs/SelectInputField/SelectInputField';
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';

//import icons & images
import { ImPlus } from 'react-icons/im';
import { FiSearch } from 'react-icons/fi';
import { RxReset } from 'react-icons/rx';

//import static data
import { levelData, statusesData } from '../../../common/utils/selectorData.js';

//import style
import style from './VolunteerFilterBar.module.css';

function VolunteerFilterBar({ handleAdd }){
    const {control , register , formState , reset , handleSubmit} = useForm({
        defaultValues:{
            search: '',
            squad: '',
            position: '',
            level: '',
            status: '',
        }
    });

    const status = useSelector(selectVolunteerStatus);

    const onSubmit = (values) => {
        console.log(values)
        //dispatch search action to redux
    }

    return (
        <div className={style['bar']}>
            <form className={style['filter-bar']} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    type='text'
                    name='search'
                    placeholder='Search...'
                    width='277px'
                    height='40px'
                    control={register('search')}
                />
                <SelectInputField
                    width='150px'
                    height='40px'
                    name='status'
                    placeholder='All statuses'
                    options={Object.values(statusesData)}
                    control={control}
                />
                <SelectInputField
                    width='150px'
                    height='40px'
                    name='squad'
                    placeholder='All squads'
                    options={Object.values(statusesData)}
                    control={control}
                />
                <SelectInputField
                    width='150px'
                    height='40px'
                    name='position'
                    placeholder='All positions'
                    options={Object.values(statusesData)}
                    control={control}
                />
                <SelectInputField
                    width='150px'
                    height='40px'
                    name='level'
                    placeholder='All levels'
                    options={Object.values(levelData)}
                    control={control}
                />
                <span className={style['bar-buttons']}>
                    <SubmitButton 
                        width='40px'
                        height='30px'
                        disabled={status==='loading' || status==='idle' ? true : false}
                    >
                        <FiSearch size='15px'/>
                    </SubmitButton>
                    <span className={style.reset} onClick={() => reset(formState.defaultValues)}>
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