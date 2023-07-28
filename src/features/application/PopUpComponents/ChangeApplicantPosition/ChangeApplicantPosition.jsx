// import react
import React , { useState }  from 'react';
import { useForm } from 'react-hook-form';

// import components 
import SelectInputField from '../../../../common/components/Inputs/SelectInputField/SelectInputField';
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';
import Button from '../../../../common/components/Inputs/Button/Button';
import Loader from '../../../../common/components/Loader/Loader';

// import icons
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";

//import static data
import {levelData} from '../../../../common/utils/selectorData'

//import style 
import style from './ChangeApplicantPosition.module.css';

function ChangeApplicantPosition({handleClose}) {

    const {control , formState : {errors} , handleSubmit } = useForm({
        defaultValues:{
            position : '',
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
            <div className={style["change-applicant-position"]}>
                <Loader  transparent={true}/>
            </div>
        );
    }

    return (
        <div className={style["change-applicant-position"]}>
            <div className={style["change-applicant-position-header"]}>
                <h2>Change Applicant's Position</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={handleClose}
                />
            </div>
            <form className={style["change-applicant-position-body"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.box}>
                    <SelectInputField
                        width='216px'
                        height='40px'
                        name='position'
                        placeholder='Position'
                        options={levelData}
                        control={control}
                        required={'enter the position'}
                        errors={errors}
                        border={true}
                    />
                </div>
                <div className={style.buttons}>
                    <SubmitButton 
                        width='177px' 
                        height='40px'
                        disabled={isLoading}
                    >
                        Change Position
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

export default ChangeApplicantPosition;