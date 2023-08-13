// import react
import React , { useState }  from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

//import redux
import { useDispatch } from 'react-redux';
import {updateApplication} from '../../ApplicationSlice';
import {showMessage} from '../../../snackBar/snackBarSlice';

// import components 
import InputField from '../../../../common/components/Inputs/InputField/InputField';
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';
import Button from '../../../../common/components/Inputs/Button/Button';
import Loader from '../../../../common/components/Loader/Loader';

// import icons
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";

//import static data
import { recruitmentStatusData } from '../../../../common/utils/selectorData';

//import style 
import style from './ConfirmRecruitment.module.css';

function ConfirmRecruitment({id , handleClose}) {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const {register , watch , formState : {errors} , handleSubmit } = useForm({
        defaultValues:{
            firstName : '',
            lastName : '',
            password : '',
            confirmPassword : '',
        }
    })

    const [isLoading , setIsLoading] = useState(false);

    const onSubmit = async (values) => {
        try{
            setIsLoading(true);
            await dispatch(updateApplication({id , ...values , status: recruitmentStatusData.done.toUpperCase()})).unwrap();
            dispatch(showMessage({message: 'Application done successfully' , severity: 1}));
            handleClose();
            nav('/application');
        }catch(error){
            dispatch(showMessage({message: error , severity: 2}));
            setIsLoading(false);
        }
    }

    if(isLoading===true){
        return (
            <div className={style["confirm-recruitment"]}>
                <Loader  transparent={true}/>
            </div>
        );
    }

    return (
        <div className={style["confirm-recruitment"]}>
            <div className={style["confirm-recruitment-header"]}>
                <h2>Confirm Recruitment</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={handleClose}
                />
            </div>
            <form className={style["confirm-recruitment-body"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.box}>
                    <InputField 
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                        width='200px'
                        height='40px'
                        control={register('firstName' , {
                            required: 'Please Enter The First Name',
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
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.box}>
                    <InputField 
                        type='password'
                        placeholder='Password'
                        name='password'
                        width='200px'
                        height='40px'  
                        control={register('password' , {
                            required: 'Please enter the password',
                        })}
                        errors={errors}
                    />
                    <InputField 
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        width='200px'
                        height='40px'  
                        control={register('confirmPassword' , {
                            required: 'Please enter the Confirm Password',
                            validate: (confirmPassword) => {
                                if (watch('password') !== confirmPassword) {
                                    return "The confirm password doesn't match the password";
                                }
                            }
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.buttons}>
                    <SubmitButton 
                        width='160px' 
                        height='40px'
                        disabled={isLoading}
                        backgroundColor='var(--secondary-dark)'
                    >
                        Create Account
                    </SubmitButton>
                </div>
            </form>
            <div className={style.email}>
                <Button 
                    width='166px' 
                    height='40px' 
                    color='var(--natural-3)' 
                    backgroundColor='var(--natural-8)' 
                    onClick={() => console.log("mail")}
                >
                    <HiOutlineMail color='var(--word-color)' size="17px"/> Preview Email
                </Button>
            </div>
        </div>
    );
}

export default ConfirmRecruitment;