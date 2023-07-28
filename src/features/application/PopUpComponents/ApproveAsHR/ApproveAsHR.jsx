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
import style from './ApproveAsHR.module.css';

function ApproveAsHR({handleClose}) {

    const {control , register , formState : {errors} , handleSubmit } = useForm({
        defaultValues:{
            hrFeedback : '',
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
            <div className={style["approve-as-hr"]}>
                <Loader  transparent={true}/>
            </div>
        );
    }

    return (
        <div className={style["approve-as-hr"]}>
            <div className={style["approve-as-hr-header"]}>
                <h2>Approve As HR</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={handleClose}
                />
            </div>
            <form className={style["approve-as-hr-body"]} onSubmit={handleSubmit(onSubmit)}>
                <Button 
                    width='166px' 
                    height='40px' 
                    color='var(--natural-3)' 
                    backgroundColor='var(--natural-8)' 
                    onClick={() => console.log("mail")}
                >
                    <HiOutlineMail color='var(--word-color)' size="17px"/> Preview Email
                </Button>
                <TextAreaField 
                    name='hrFeedback'
                    placeholder='HR Feedback'
                    width='385px'
                    height='120px'
                    control={register('hrFeedback' , {
                        required: 'Please enter the HR Feedback',
                    })}
                    errors={errors}
                />
                <SubmitButton 
                    width='137px' 
                    height='40px'
                    disabled={isLoading}
                >
                    Approve
                </SubmitButton>
            </form>
        </div>
    );
}

export default ApproveAsHR;