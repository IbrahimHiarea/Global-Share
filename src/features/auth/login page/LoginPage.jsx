//import react
import React from 'react';
import { useForm } from 'react-hook-form';

//import components
import InputField from '../../../common/components/InputField/InputField';
import SubmitButton from '../../../common/components/SubmitButton/SubmitButton';

//import redux state
import { useDispatch , useSelector } from 'react-redux';
import { selectAllAuth  , login} from '../AuthSlice';

//import svg
import {ReactComponent as MainLogo } from '../../../assets/icons/mainLogo.svg';
import {ReactComponent as TitleLogo} from '../../../assets/icons/title.svg';

//import style
import style from './LoginPage.module.css';

function LoginPage (){
    const {register , formState: {errors} , handleSubmit} = useForm({
        defaultValues:{
            username: '',
            password: ''
        }
    });

    const dispatch = useDispatch();
    const {status , error , token} = useSelector(selectAllAuth);

    const onError  = (data) => console.log(data);
    const onSubmit = async (data) => {
        console.log(data);
        try{
            await dispatch(login({...data})).unwrap();
            //nav to task
        }catch(e){
            //show error massage
        }
    }

    return (
        <div className={style['login-page']}>
            <form className={style.form}  onSubmit={handleSubmit(onSubmit , onError)}>
                <div className={style.logo}>
                    <MainLogo />
                    <TitleLogo />
                </div>
                <InputField
                    type='text'
                    placeholder='Enter your name'
                    name={'username'}
                    autoFocus
                    control={register('username' , {
                            required: 'Please enter your name',
                            pattern: {
                                value: /^[a-zA-Z]+([',.-][a-zA-Z]+)*$/,
                                message: "Please enter a valid name"
                            } 
                        }
                    )}
                    errors={errors}
                >
                    Name
                </InputField>
                <InputField
                    type='password'
                    placeholder='Enter your password'
                    name='password'
                    control={register('password' , {
                            required: 'Please enter your password',
                            pattern: {
                                value: /^(?!\s)(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,10}$/,
                                message: 'Please enter a valid password'
                            }
                        }
                    )}
                    errors={errors}
                >
                    Password
                </InputField>
                <p>
                    Forget your password? <span>Click here</span>
                </p>
                <SubmitButton disabled={status==='loading'}>
                    sign in
                </SubmitButton>
            </form>
        </div>
    );
}

export default LoginPage;