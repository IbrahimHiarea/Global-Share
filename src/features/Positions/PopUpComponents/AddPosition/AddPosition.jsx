// import react
import React , { useState }  from 'react';
import { useForm } from 'react-hook-form';

// import components 
import InputField from '../../../../common/components/Inputs/InputField/InputField';
import SelectInputField from "../../../../common/components/Inputs/SelectInputField/SelectInputField";
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';
import Loader from '../../../../common/components/Loader/Loader';

// import icons
import { IoCloseOutline } from "react-icons/io5";

//import static data
import {levelData} from '../../../../common/utils/selectorData'

//import style 
import style from './AddPosition.module.css';

function AddPosition({handleClose}) {
    const {control , register , formState : {errors} , handleSubmit } = useForm({
        defaultValues:{
            name : '',
            gsName : '',
            level : null,
            weeklyHours: '',
        }
    })

    const [isLoading , setIsLoading] = useState(false);

    const onSubmit = async (values) => {
        setIsLoading(true);
        console.log(values);
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
                        width='185px'
                        height='40px'
                        control={register('name' , {
                            required: 'Please Enter the Name',
                            pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "The name don't match the pattern"
                            }
                        })}
                        errors={errors}
                    />
                    <InputField 
                        type='text'
                        name='gsName'
                        placeholder='Gs Name'
                        width='185px'
                        height='40px'
                        control={register('gsName' , {
                            required: 'Please Enter The Gs Name',
                            pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "The GS name don't match the pattern"
                            }
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.box}>
                    <SelectInputField
                        width='185px'
                        height='40px'
                        name='level'
                        placeholder='Levels'
                        options={Object.values(levelData)}
                        control={control}
                        required={'enter the level'}
                        errors={errors}
                        border={true}
                        menuHeight={100}
                    />
                    <InputField 
                        type='text'
                        placeholder='Weekly Hours'
                        name='weeklyHours'
                        width='185px'
                        height='40px'  
                        control={register('weeklyHours' , {
                            required: 'Please enter the weekly Hours',
                            pattern: {
                                value: /^\d+$/,
                                message: 'should be a Number'
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