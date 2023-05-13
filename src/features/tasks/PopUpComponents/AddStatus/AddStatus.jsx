//import package
import React from 'react';
import { useForm } from 'react-hook-form';

// import components 
import SubmitButton from '../../../../common/components/SubmitButton/SubmitButton';
import InputField from '../../../../common/components/Inputs/InputField/InputField';

//import style
import style from './AddStatus.module.css';

// import icons
import { IoCloseOutline } from "react-icons/io5";

function AddStatus ({close}){
    const { register , formState , handleSubmit } = useForm({
        defaultValues:{
            statusName: '',
        }
    })

    const onSubmit = async (data) => {
        console.log(data);
        close();
    }

    return (
        <div className={style['add-status']}>
                <div className={style['add-status-header']}>
                    <h2>Create New Column</h2>
                    <IoCloseOutline 
                        size='20px' 
                        color='var(--natural-alpha-1)' 
                        cursor='pointer' 
                        onClick={close}
                    />
                </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField 
                    type='text'
                    name='statusName'
                    placeholder='Name'
                    width='100%'
                    height='40px'
                    control={register('statusName' , 
                        {
                            required: 'Please enter status name',
                        }
                    )}
                />
                <SubmitButton 
                    width='112px' 
                    height='40px'
                    disabled={!formState.isValid}
                >
                    Create
                </SubmitButton>
            </form>
        </div>
    );
}

export default AddStatus;  