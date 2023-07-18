// import react
import React , { useState }  from 'react';
import { useForm } from 'react-hook-form';

//import redux
import { useSelector } from 'react-redux';
import { selectPositionById } from '../../PositionSlice';

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
import style from './EditPosition.module.css';

function EditPosition({id , handleClose}) {
    const data = useSelector((state) => selectPositionById(state , id));

    const {control , register , formState: {errors , isDirty , dirtyFields} , handleSubmit } = useForm({
        defaultValues:{
            name : '',
            gsName : '',
            level : null,
            weeklyHours: '',
        },
        values: {name: data.name , gsName: data.gsName , weeklyHours: data.weeklyHours , level: {label: data.gsLevel , value: data.gsLevel}}
    })

    const [isLoading , setIsLoading] = useState(false);

    const onSubmit = async (values) => {
        setIsLoading(true);
        if(isDirty){
            const changed = {};
            for(let key of Object.keys(dirtyFields)){
                if(dirtyFields[key]){
                    changed[key] = values[key];
                }
            }
            console.log(changed);
            //TODO::
            // dispatch update action to redux
        }
    }

    if(isLoading===true){
        return (
            <div className={style["edit-position"]}>
                <Loader  transparent={true}/>
            </div>
        );
    }

    return (
        <div className={style["edit-position"]}>
            <div className={style["edit-position-header"]}>
                <h2>Edit Position</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={handleClose}
                />
            </div>
            <form className={style["edit-position-body"]} onSubmit={handleSubmit(onSubmit)}>
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
                                message: "The name don't match the pattern"
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
                        options={levelData}
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
                        disabled={isLoading || !isDirty}
                    >
                        Edit Position
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

export default EditPosition;