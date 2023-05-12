//import package
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// import components 
import SubmitButton from '../../../common/components/SubmitButton/SubmitButton';
import InputField from '../../../common/components/InputField/InputField';

//import style
import style from './AddStatus.module.css';

// import icons
import { IoCloseOutline } from "react-icons/io5";

function AddStatus ({ setAddStatus }){

    const { register , formState , handleSubmit } = useForm({
        defaultValues:{
            statusName: '',
        }
    })

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className={style['pop-up']}>
            <div className={style['add-status']}>
                <div className={style['add-status-header']}>
                    <h2>Create New Column</h2>
                    <IoCloseOutline size='20px' color='#4F4F4F' cursor='pointer' onClick={() => setAddStatus(false)}></IoCloseOutline>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField 
                        type='text'
                        name='statusName'
                        placeholder='Name'
                        width='100%'
                        height='40px'
                        control={register('statusName')}
                        required
                    />
                    <SubmitButton width='112px' height='40px'>Create</SubmitButton>
                </form>
            </div>
        </div>
    );
}

export default AddStatus;