// import react
import React , { useRef, useState }  from 'react';
import { useForm } from 'react-hook-form';

// import components 
import InputField from '../../../../common/components/Inputs/InputField/InputField';
import SelectInputField from "../../../../common/components/Inputs/SelectInputField/SelectInputField";
import Button from '../../../../common/components/Inputs/Button/Button';
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';

// import icons
import { IoCloseOutline } from "react-icons/io5";

//import static data
import {levelData} from '../../../../common/utils/selectorData'

//import style 
import style from './AddPosition.module.css';
import Loader from '../../../../common/components/Loader/Loader';

function AddPosition({handleClose}) {

    const {control , register , formState : {errors} , handleSubmit , unregister } = useForm({
        defaultValues:{
            name : '',
            gsName : '',
            level : '',
            weekluHours: '',
        }
    })

    const [isLoading , setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log(data);
        //TODO:: 
        // dispatch add action to redux
    }

    if(isLoading===true){
        return (
            <div className={style["add-position"]}>
                <Loader  transparent={true}/>
            </div>
        );
    }
    
    return (
        <div className={style["add-position"]}>
            <div className={style["add-position-header"]}>
                <h2>Add Position</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={handleClose}
                />
            </div>
            <form className={style["add-position-body"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.box}>
                    <InputField 
                        type='text'
                        name='name'
                        placeholder='Name'
                        width='183px'
                        height='40px'
                        control={register('name' , {
                            required: 'Please Enter Name',
                            pattern: {
                                value: /^[A-Za-z]+$/,
                                message: "The name don't match the pattern"
                            }
                        })}
                        errors={errors}
                    />
                    <InputField 
                        type='text'
                        name='gsName'
                        placeholder='Gs Name'
                        width='183px'
                        height='40px'
                        control={register('gsName' , {
                            required: 'Please Enter The Gs Name',
                            pattern: {
                                value: /^[A-Za-z]+$/,
                                message: "The name don't match the pattern"
                            }
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.box}>
                    <SelectInputField
                        width='183px'
                        height='40px'
                        name='level'
                        placeholder='Levels'
                        options={levelData}
                        control={control}
                        required={'enter the level'}
                        errors={errors}
                        border={true}
                    />
                    <InputField 
                        type='text'
                        placeholder='Weekly Hours'
                        name='weeklyHours'
                        width='183px'
                        height='40px'  
                        control={register('weeklyHours' , {
                            required: 'Please enter the weeklyHours',
                            pattern: {
                                value: /^\d$/,
                                message: 'Please a Number'
                            }
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.buttons}>
                    <SubmitButton 
                        width='157px' 
                        height='40px'
                        disabled={isLoading}
                    >
                        Add Position
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

export default AddPosition;