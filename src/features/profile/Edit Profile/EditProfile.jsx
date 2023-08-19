//import react
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

//import redux
import { useSelector , useDispatch} from 'react-redux';
import {fetchProfileDetails, selectProfileData, selectProfileStatus , updateProfileDetails} from '../profileSlice';
import {showMessage} from '../../snackBar/snackBarSlice';

//import components
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';
import InputField from '../../../common/components/Inputs/InputField/InputField';
import Loader from '../../../common/components/Loader/Loader';
import Error from '../../../common/components/Error/Error';
import Button from '../../../common/components/Inputs/Button/Button';
import TextAreaField from '../../../common/components/Inputs/TextAreaField/TextAreaField';
import { Avatar } from '@mui/material';

//import icon & image
import profileImage from '../../../assets/images/profile.png';

//import style
import style from './EditProfile.module.css';
import FileUpload from '../../../common/components/Inputs/FileUpload/FileUpload';

function EditProfile (){
    const nav = useNavigate();
    const dispatch = useDispatch();

    const status = useSelector(selectProfileStatus);
    const data = useSelector(selectProfileData);

    const {register , formState: {errors , isDirty , dirtyFields}, 
            handleSubmit , setValue , watch} = useForm({
        defaultValues:{ ...data , resume : null },
        values : {...data , resume : null }
    })

    const onError  = (values) => console.log(values);
    const onSubmit = async (values) => {
        if(isDirty || values.resume){
            const changed = {};
            for(let key of Object.keys(dirtyFields)){
                if(dirtyFields[key]){
                    changed[key] = values[key];
                }
            }
            if(values.resume) changed.resume = values.resume;
            try{
                await dispatch(updateProfileDetails(changed)).unwrap();
                nav('/dashboard/profile');
            }
            catch(error){
                dispatch(showMessage({message: error , severity: 2}));
            }
        }
    }


    useEffect(() => {
        const promise = dispatch(fetchProfileDetails());

        return () => {
            promise.abort();
        }
    }, [])


    if(status === 'loading' || status === 'idle'){
        return(
            <div className={style['profile-page']}>
                <Loader />
            </div>
        );  
    }

    else if(status === 'failed'){
        return (
            <div className={style['profile-page']}>
                <Error />
            </div>
        );
    }

    else{
        return (
            <div className={style['profile-page']}>
                <div className={style['profile-header']}>
                    <div className={style['header-background']}></div>
                    <div className={style['header-content']}>
                        <div className={style.image}>
                            <Avatar 
                                src={profileImage}
                                alt='Ahmad Alshahal' 
                                sx={{
                                    width: '137px', 
                                    height: '137px'
                                }} 
                            />
                        </div>

                        <div className={style['header-info']}>
                            <div className={style['header-name']}>
                                <h2>{`${data.firstName} ${data.middleName} ${data.lastName}`}</h2>
                            </div>
                        </div>
                        <Button 
                            width='80px' 
                            height='40px' 
                            color='black' 
                            backgroundColor='white' 
                            onClick={() => nav('/dashboard/profile')}
                        >
                            cancel
                        </Button>
                    </div>
                </div>

                <form className={style['profile-body']} onSubmit={handleSubmit(onSubmit , onError)}>
                    <div className={style.box}>
                        <InputField
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            width='233px'
                            height='45px'   
                            control={register('firstName' , {
                                    required: 'Please enter your first name',
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "The name don't match the pattern"
                                    }
                                }
                            )}
                            errors={errors}
                        >
                            First Name
                        </InputField>
                        <InputField
                            type='text'
                            name='middleName'
                            placeholder='Middle name'
                            width='233px'
                            height='45px'   
                            control={register('middleName' , {
                                required: 'Please enter your first name',
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: "The name don't match the pattern"
                                }
                            })}
                            errors={errors}
                        >
                            Middle name
                        </InputField>
                        <InputField
                            type='text'
                            name='lastName'
                            placeholder='Last name'
                            width='233px'
                            height='45px'   
                            control={register('lastName' , {
                                    required: 'Please enter your last name',
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "The name don't match the pattern"
                                    }
                                }
                            )}
                            errors={errors}
                        >
                            Last name
                        </InputField>
                        <InputField
                            type='email'
                            name='email'
                            placeholder='Email'
                            width='233px'
                            height='45px'   
                            control={register('email' , {
                                    required: 'Please enter your email',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "The email don't match the pattern"
                                    },
                                    disabled: true,
                                }
                            )}
                            errors={errors}
                        >
                            Email
                        </InputField>
                    </div>
                    <div className={style.break}></div>
                    <div className={style.box}>
                        <InputField
                            type='text'
                            name='additionalEmail'
                            placeholder='Additional Email'
                            width='233px'
                            height='45px'   
                            control={register('additionalEmail' , {
                                    required: 'Please enter your Additional email',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "The email don't match the pattern"
                                    },
                                }
                            )}
                            errors={errors}
                        >
                            Additional email
                        </InputField>
                        <InputField
                            type='text'
                            name='arabicFullName'
                            placeholder='Full arabic name'
                            width='233px'
                            height='45px'   
                            control={register('arabicFullName' , {
                                required: 'Please enter your arabic name',
                                pattern: {
                                    value: /^[\u0621-\u064A\s]+$/,
                                    message: "The name don't match the pattern"
                                }
                            })}
                            errors={errors} 
                        >
                            Full arabic name
                        </InputField>
                        <InputField
                            type='date'
                            name='joinDate'
                            width='233px'
                            height='45px'   
                            control={register('joinDate' , {
                                    required: 'Please enter your birth date',
                                    validate: (value) => {
                                        const date = new Date(value);
                                        const cur = new Date();
                                        if(date > cur) return "Date should by start from today";
                                    }
                                }
                            )}
                            errors={errors}
                        >
                            Join Date
                        </InputField>
                        <InputField
                            type='tel'
                            name='phoneNumber'
                            placeholder='Phone number'
                            width='233px'
                            height='45px'   
                            control={register('phoneNumber' , {
                                    required: 'Please enter your Phone number',
                                    pattern: {
                                        value: /^(\+?963|0)?9\d{8}$/,
                                        message: 'Please enter a valid phone number'
                                    }
                                }
                            )}
                            errors={errors}
                        >
                            Phone number
                        </InputField>
                    </div>
                    <div className={style.break}></div>
                    <div className={style.box}>
                        <InputField
                            type='text'
                            name='appointlet'
                            placeholder='Appointlet'
                            width='233px'
                            height='45px'   
                            control={register('appointlet' , {
                                required: 'Please enter your appointlet link'
                            })}
                            errors={errors}
                        >
                            Appointlet
                        </InputField>
                    </div>
                    <div className={style.box}>
                        <TextAreaField
                            id='bio'
                            name='bio'
                            placeholder='Bio'
                            width='495px'
                            height='126px'
                            control={register('bio' , {
                                required: 'Please enter your bio'
                            })}
                            errors={errors}
                        >
                            Bio
                        </TextAreaField>
                        <FileUpload
                            name='resume'
                            file={watch("resume")}
                            setValue={setValue}
                            width="495px"
                            height='125px'
                            types={['PDF']}
                            required={false}
                        >
                            Resume
                        </FileUpload>
                    </div>
                    <div className={style.buttons}>
                        <SubmitButton 
                            width='80px' 
                            height='40px'
                            disabled={(isDirty===false && watch('resume')===null)}
                        >
                            Save
                        </SubmitButton>
                    </div>  
                </form>
            </div>
        );
    }
}

export default EditProfile;