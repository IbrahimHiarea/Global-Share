// import react
import React , { useState }  from 'react';
import { useForm } from 'react-hook-form';

// import components 
import TextAreaField from '../../../../common/components/Inputs/TextAreaField/TextAreaField';
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';
import Button from '../../../../common/components/Inputs/Button/Button';
import Loader from '../../../../common/components/Loader/Loader';

// import icons
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";

//import style 
import style from './ApproveTechInterview.module.css';

function ApproveTechInterview({handleClose}) {
    const {register , formState : {errors} , handleSubmit } = useForm({
        defaultValues:{
            techInterviewFeedback: '',
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
            <div className={style["approve-as-tech-interview"]}>
                <Loader  transparent={true}/>
            </div>
        );
    }

    return (
        <div className={style["approve-as-tech-interview"]}>
            <div className={style["approve-as-tech-interview-header"]}>
                <h2>Approve Tech Interview</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={handleClose}
                />
            </div>
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
            <form className={style["approve-as-tech-interview-body"]} onSubmit={handleSubmit(onSubmit)}>
                <TextAreaField 
                    name='techInterviewFeedback'
                    placeholder='Tech Interview Feedback'
                    width='392px'
                    height='120px'
                    control={register('techInterviewFeedback' , {
                        required: 'Please enter the Tech Interview Feedback',
                    })}
                    errors={errors}
                />
                <SubmitButton 
                    width='137px' 
                    height='40px'
                    disabled={isLoading}
                    backgroundColor='var(--secondary-dark)'
                >
                    Approve
                </SubmitButton>
            </form>
        </div>
    );
}

export default ApproveTechInterview;