// import react
import React , { useState }  from 'react';
import { useForm } from 'react-hook-form';

// import components 
import InputField from '../../../../common/components/Inputs/InputField/InputField';
import SelectInputField from "../../../../common/components/Inputs/SelectInputField/SelectInputField";
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';
import TextAreaField from '../../../../common/components/Inputs/TextAreaField/TextAreaField'
import Loader from '../../../../common/components/Loader/Loader';

// import icons
import { IoCloseOutline } from "react-icons/io5";

//import static data
import {recruitmentStatusData} from '../../../../common/utils/selectorData'

//import style 
import style from './AddEmail.module.css';

function AddEmail({handleClose}) {
    const {control , register , formState : {errors} , handleSubmit} = useForm({
        defaultValues:{
            nextRecruitmentStatus : null,
            cc : null,
            subject : '',
            body: '',
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
            <div className={style["add-email"]}>
                <Loader  transparent={true}/>
            </div>
        );
    }

    return (
        <div className={style["add-email"]}>
            <div className={style["add-email-header"]}>
                <h2>Add Email</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={handleClose}
                />
            </div>
            <form className={style["add-email-body"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.box}>
                    <SelectInputField
                        width='300px'
                        height='40px'
                        name='nextRecruitmentStatus'
                        placeholder='Next Recruitment Status'
                        options={Object.values(recruitmentStatusData)}
                        control={control}
                        required={'enter the next recruitment status'}
                        errors={errors}
                        border={true}
                    />
                    <div className={style.break}></div>
                    <SelectInputField
                        width='300px'
                        height='40px'
                        name='cc'
                        placeholder='CC'
                        options={Object.values(recruitmentStatusData)}
                        control={control}
                        required={'enter the CC'}
                        errors={errors}
                        border={true}
                        isMulti={true}
                    />
                    <InputField 
                        type='text'
                        placeholder='Subject'
                        name='subject'
                        width='300px'
                        height='40px'  
                        control={register('subject' , {
                            required: 'Please enter the subject',
                            pattern: {
                                value: /^[a-zA-Z0-9 ]+$/,
                                message: 'Please an English Character and Number'
                            }
                        })}
                        errors={errors}
                    />
                    <TextAreaField
                        placeholder='Body'
                        name='body'
                        width='518px'
                        height='154px'  
                        control={register('body' , {
                            required: 'Please enter the body'
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
                        Add Email
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

export default AddEmail;