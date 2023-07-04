//import react
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

//import components
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';
import InputField from '../../../common/components/Inputs/InputField/InputField';
import Loader from '../../../common/components/Loader/Loader';
import Button from '../../../common/components/Inputs/Button/Button';
import TextAreaField from '../../../common/components/Inputs/TextAreaField/TextAreaField';

//import icon
import { AiOutlineCloudUpload } from "react-icons/ai";

//import style
import style from './EditProfile.module.css';

// import MUI
import { Avatar } from '@mui/material';

function EditProfile (){

    const [loading , setLoading] = useState(false);

    const nav = useNavigate();

    const {register , formState: {errors} , handleSubmit} = useForm({
        defaultValues:{
            firsName: '',
            middleName: '',
            lastName: '',
            email: '',
            additionalEmail: '',
            arabicName: '',
            birthDate: '',
            phoneNumber: '',
            appointlet: '',
            bio: '',
            resume: null,
        }
    })

    const onSubmit = async (data) => {
        // TODO: Save Request
        console.log(data);
        
    }

    return (
        <div className={style['profile-page']}>
            { loading  &&  <Loader></Loader> }
            { !loading  &&
                <>
                    <div className={style['profile-header']}>
                        <div>
                            <div className={style['header-content']}>
                                <div className={style.image}>
                                    <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij6dtiHizH96qpCOe8WeXXP3yLyQJkPdGVg&usqp=CAU' alt='Profile Photo' sx={{width: '137px' , height: '137px'}}></Avatar>
                                </div>
                                <h2 className={style['header-name']}>Ahmad Al-Shahal</h2>
                            </div>
                        </div>
                    </div>
                    <form className={style['profile-body']} onSubmit={handleSubmit(onSubmit)}>
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
                                            value: /^[A-Z][a-z]{2,20}$/,
                                            message: 'The max length of the first name 20 and should contain of English characters and start with UpperCase'
                                        }
                                    }
                                )}
                                errors={errors}
                                autoFocus
                            >
                                First Name
                            </InputField>
                            <InputField
                                type='text'
                                name='middleName'
                                placeholder='Middle name'
                                width='233px'
                                height='45px'   
                                control={register('middleName')}
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
                                            value: /^[A-Z][a-z]{2,20}$/,
                                            message: 'The max length of the last name 20 and should contain of English characters and start with UpperCase'
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
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Wrong format for email'
                                        }
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
                                type='email'
                                name='additionalEmail'
                                placeholder='Additional Email'
                                width='233px'
                                height='45px'   
                                control={register('additionalEmail' , {
                                        required: 'Please enter your Additional email',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Wrong format for Additional email'
                                        }
                                    }
                                )}
                                errors={errors}
                            >
                                Additional email
                            </InputField>
                            <InputField
                                type='text'
                                name='arabicName'
                                placeholder='Full arabic name'
                                width='233px'
                                height='45px'   
                                control={register('arabicName')}
                                errors={errors}
                            >
                                Full arabic name
                            </InputField>
                            <InputField
                                type='date'
                                name='birthDate'
                                width='233px'
                                height='45px'   
                                control={register('birthDate' , {
                                        required: 'Please enter your birth date',
                                    }
                                )}
                                errors={errors}
                            >
                                Birth date
                            </InputField>
                            <InputField
                                type='text'
                                name='phoneNumber'
                                placeholder='Phone number'
                                width='233px'
                                height='45px'   
                                control={register('phoneNumber' , {
                                        required: 'Please enter your Phone number',
                                        pattern: {
                                            value: /^(\+?963|0)?9\d{8}$/,
                                            message: 'unvalid phone number'
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
                                value=''
                                placeholder='Appointlet'
                                width='233px'
                                height='45px'   
                                control={register('appointlet')}
                                errors={errors}
                            >
                                Appointlet
                            </InputField>
                        </div>
                        <div className={style.box}>
                            <TextAreaField
                                id='bio'
                                placeholder='Bio'
                                width='495px'
                                height='126px'
                                control={register('bio')}
                                errors={errors}
                            >
                                Bio
                            </TextAreaField>
                            <div className={style.upload}>
                                <InputField
                                    type='file'
                                    name='resume'
                                    placeholder='Click to upload or drag and drop PDF (max, 32MB)'
                                    width='495px'
                                    height='126px'
                                    control={register('resume')}
                                    accept=".pdf"
                                    errors={errors}
                                >
                                    Resume
                                </InputField>
                                <div className={style["upload-content"]}>
                                    <AiOutlineCloudUpload size={'35px'} color="#232360"></AiOutlineCloudUpload>
                                    <div className={style["file-name"]}>Click to upload or drag and drop PDF (max, 32MB)</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.buttons}>
                            <Button width='80px' height='40px' color='black' backgroundColor='white' onClick={() => nav('/dashboard/profile')}>Cancel</Button>
                            <SubmitButton width='80px' height='40px'>Save</SubmitButton>
                        </div>
                    </form>
                </>
            }
        </div>
    );
}

export default EditProfile;