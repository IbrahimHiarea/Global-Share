//import react
import React from 'react';
import { useForm } from 'react-hook-form';

//import redux
import { useSelector } from 'react-redux';
import { selectSquadStatus } from '../squadSlice';

//import components
import InputField from '../../../common/components/Inputs/InputField/InputField';
import Button from '../../../common/components/Inputs/Button/Button';
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';

//import icons & images
import { ImPlus } from 'react-icons/im';
import { FiSearch } from 'react-icons/fi';
import {RxReset} from 'react-icons/rx';

//import style 
import style from './SquadFilterBar.module.css';

function SquadFilterBar({handleAdd}){
    const {register , formState , reset , handleSubmit} = useForm({
        defaultValues:{
            search: '',
        }
    });

    const status = useSelector(selectSquadStatus);

    const onSubmit = (values) => {
        console.log(values);
        //TODO::
        //dispatch search action to redux
    }

    return (
        <div className={style['bar']}>   
            <form  className={style['filter-bar']} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    type='text'
                    name='search'
                    placeholder='Search...'
                    width='277px'
                    height='40px'
                    control={register('search')}
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
                    <ImPlus size="13px" color='white'style={{marginRight: '8px'}}/> Add squad
                </Button>
            </div>
        </div>
    );
}

export default SquadFilterBar;