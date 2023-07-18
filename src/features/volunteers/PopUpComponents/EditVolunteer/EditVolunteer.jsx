// import react
import React , { useRef, useState }  from 'react';
import { useForm } from 'react-hook-form';

//import redux
import { useSelector } from 'react-redux';
import {selectVolunteerById } from '../../VolunteerSlice';

// import components 
import InputField from '../../../../common/components/Inputs/InputField/InputField';
import SelectInputField from "../../../../common/components/Inputs/SelectInputField/SelectInputField";
import Button from '../../../../common/components/Inputs/Button/Button';
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';

// import icons
import { IoCloseOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";

//import static data
import { levelData } from '../../../../common/utils/selectorData';

//import style 
import style from './EditVolunteer.module.css';
import Loader from '../../../../common/components/Loader/Loader';

function EditVolunteer({id , handleClose}) {
    const data = useSelector((state) => selectVolunteerById(state , id));

    const {control , register , formState: {errors , isDirty , dirtyFields} , handleSubmit , unregister } = useForm({
        defaultValues:{
            firstName : '',
            lastName : '',
            email : '',
            password: '',
        },
        values: {...data}
    })

    const [isLoading , setIsLoading] = useState(false);
    const positionsAndSquadsNumber = useRef(1);
    const [positionsAndSquads , setPositionsAndSquads] = useState([0]);

    const handelDelete = (positionsAndSquadsId) => {
        const newPositionsAndSquads = positionsAndSquads.filter((id) => {return id !== positionsAndSquadsId});
        unregister([`positions${positionsAndSquadsId}`]);
        unregister([`squads${positionsAndSquadsId}`]);
        setPositionsAndSquads(newPositionsAndSquads);
    };

    const handelAdd = () => {
        setPositionsAndSquads([...positionsAndSquads , positionsAndSquadsNumber.current++]);
        positionsAndSquadsNumber.current++;
    }

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
            <div className={style["edit-volunteer"]}>
                <Loader transparent={true}/>
            </div>
        );
    }

    return (
        <div className={style["edit-volunteer"]}>
            <div className={style["edit-volunteer-header"]}>
                <h2>Edit volunteer</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={handleClose}
                />
            </div>
            <form className={style["edit-volunteer-body"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.box}>
                <InputField 
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                        width='200px'
                        height='40px'
                        control={register('firstName' , {
                            required: 'Please Enter The First Name',
                            pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "The name don't match the pattern"
                            }
                        })}
                        errors={errors}
                    />
                    <InputField 
                        type='text'
                        name='lastName'
                        placeholder='Last Name'
                        width='200px'
                        height='40px'
                        control={register('lastName' , {
                            required: 'Please Enter The Last Name',
                            pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "The name don't match the pattern"
                            }
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.box}>
                    <InputField 
                        type='text'
                        name='email'
                        placeholder='Email'
                        width='230px'
                        height='40px'   
                        control={register('email' , {
                            required: 'Please enter the email',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "The email don't match the pattern"
                            },
                        })}
                        errors={errors}
                    />
                    <InputField 
                        type='password'
                        placeholder='Password'
                        name='password'
                        width='200px'
                        height='40px'  
                        control={register('password' , {
                            pattern: {
                                value: /^(?!\s)(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,10}$/,
                                message: 'Please enter a valid password'
                            }
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.break}></div>
                <div className={style.positions}>
                    { 
                        positionsAndSquads.map((id) => (
                            <div key={id}>
                                <div className={style.box}>
                                    <SelectInputField
                                        width='180px'
                                        height='40px'
                                        name={`squads${id}`}
                                        placeholder='All Squads'
                                        options={levelData}
                                        control={control}
                                        required={'enter the squad'}
                                        errors={errors}
                                        border={true}
                                    />
                                    <SelectInputField
                                        width='210px'
                                        height='40px'
                                        name={`positions${id}`}
                                        placeholder='All Positions'
                                        options={levelData}
                                        control={control}
                                        required='enter the position'
                                        errors={errors}
                                        border={true}
                                    />
                                    <Button backgroundColor="var(--error-background)" width="40px" height="40px" onClick={() => handelDelete(id)}>
                                        <BsTrash size="18px" color='var(--error-main)'/>
                                    </Button>
                                </div>
                                <div className={style.break}></div>   
                            </div>
                        ))
                    }
                </div>
                <div className={style.buttons}>
                    <SubmitButton 
                        width='157px' 
                        height='40px'
                        disabled={isLoading || !isDirty}
                    >
                        Save
                    </SubmitButton>
                </div>
            </form>
            <div className={style["add-button"]}>
                <Button backgroundColor="var(--secondary-dark)" width="202px" height="40px" onClick={handelAdd}>
                    Add Another Position
                </Button>
            </div>
        </div>
    );
}

export default EditVolunteer;