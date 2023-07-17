//import react
import React from 'react';
import { useForm } from 'react-hook-form';

//import redux
import { useSelector } from 'react-redux';
import {selectPositionStatus} from '../PositionSlice'

//import components
import InputField from '../../../common/components/Inputs/InputField/InputField';
import Button from '../../../common/components/Inputs/Button/Button';
import SelectInputField from '../../../common/components/Inputs/SelectInputField/SelectInputField';
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';

//import icons & images
import { ImPlus } from 'react-icons/im';

//import static data
import { levelData, statusesData } from '../../../common/utils/selectorData.js';

//import style
import style from './PositionFilterBar.module.css';

function PositionFilterBar({ handleAdd }) {

    const {control , register , formState , reset , handleSubmit} = useForm({
        defaultValues:{
            search: '',
            squad: '',
            level: '',
        }
    });

    const status = useSelector(selectPositionStatus);

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
                    name='level'
                    placeholder='All levels'
                    options={levelData}
                    control={control}
                />
                <SelectInputField
                    width='150px'
                    height='40px'
                    name='squad'
                    placeholder='All squads'
                    options={statusesData}
                    control={control}
                />
                <span className={style['bar-buttons']}>
                    <SubmitButton 
                        width='60px'
                        height='30px'
                        disabled={status==='loading' || status==='idle' ? true : false}
                    >
                        search
                    </SubmitButton>
                    <span className={style.reset} onClick={() => reset(formState.defaultValues)}>
                        Clear
                    </span>
                </span>
            </form>
            <div style={{marginBottom: '5px'}}>
                <Button width="150px" height="40px" onClick={handleAdd}>
                    <ImPlus size="13px" color='white'style={{marginRight: '8px'}}/> Add Volunteer
                </Button>
            </div>
        </div>
    );
}

export default PositionFilterBar;