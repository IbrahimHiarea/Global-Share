//import react
import React , {useState , useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate  } from 'react-router-dom';
import { useParams } from 'react-router';
import { Controller } from "react-hook-form";

// import API
import { useDispatch } from 'react-redux';
import { getQuestionsByVacancyIdData , createApply } from '../../homAPI'
import {showMessage}from '../../../../features/snackBar/snackBarSlice';


// import Components 
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';
import InputField from '../../../../common/components/Inputs/InputField/InputField';
import TextAreaField from '../../../../common/components/Inputs/TextAreaField/TextAreaField'
import SplashScreen from '../../../SplashScreen/SplashScreen';
import SelectQuestion from '../../../../common/components/Inputs/SelectQuestion/SelectQuestion';
import FileUpload from '../../../../common/components/Inputs/FileUpload/FileUpload';
import Error from '../../../../common/components/Error/Error';


//import static data
import {questionTypeData} from '../../../../common/utils/selectorData'

// import icons 
import {ReactComponent as MainLogo } from '../../../../assets/icons/mainLogo.svg';
import {ReactComponent as TitleLogo} from '../../../../assets/icons/title.svg';

//import style
import style from './JoinUsForm.module.css';


function JoinUsForm (){
    const {vacancyId : id} = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    
    const {control , register , formState : {errors} , handleSubmit , watch , setValue , reset} = useForm({
        defaultValues: {
            email: '',
        }
    });

    const [isLoading , setIsLoading] = useState(false);
    const [isError , setIsError] = useState(false);
    const [questions , setQuestions] = useState([]);

    const onSubmit = async (values) => {
        try{
            const newValues = {
                vacancyId: id,
                email: '',
                answers: [] ,
                files: []
            }
            for (const key of Object.keys(values)) {
                if(key === 'email'){
                    newValues[key] = values[key];
                }
                else if(key === 'files'){
                    values[key].forEach((file,index) => {
                        newValues.files.push({
                            questionId: index,
                            content: file
                        })
                    })
                }
                else{
                    newValues.answers.push({
                        questionId: parseInt(key),
                        content: (Array.isArray(values[key]) ? values[key] : [values[key]])
                    })
                }
                
            }

            setIsLoading(true);
            
            const controller = new AbortController();

            await createApply({
                values: newValues,
                signal: controller.signal
            }).then(() => {
                reset();
                dispatch(showMessage({message: 'The Apply sent successfully' , severity: 1}));
                nav('/home')
            }).catch((error) => {
                dispatch(showMessage({message: error.message , severity: 2}))
            });
            
            setIsLoading(false);
            
        }catch(error){
            
        }
    }

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        const controller = new AbortController();
        getQuestionsByVacancyIdData({
            vacancyId: id,
            signal: controller.signal,
            setIsError: {setIsError}
        }).then(questions => {
            setQuestions(questions);
        }).catch((error) => {
            setIsError(error);
        });
        
        setIsLoading(false);
        return () =>  controller.abort();  
    } , [])

    if(isLoading){
        return(
            <SplashScreen></SplashScreen>
        )
    }

    if(isError){
        return (
            <div className={style['error-page']}>
                <Error/>
            </div>
        )
    }


    return (
        <div className={style['join-us-form']}>
            <div className={style.header}>
                <a href="home" onClick={() => nav('/home')}>
                    <div className={style.logo}>
                        <MainLogo/>
                        <TitleLogo/>
                    </div>
                </a>
            </div>
            <div className={style.body}>
                <h1>Join Our Squads</h1>
                <form className={style.form}  onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.questions}>
                        <InputField
                            width="320px"
                            height="40px"   
                            type='email'
                            name='email'
                            control={register(`email` , {
                                    required: 'Please enter your email',
                                }
                            )}
                            errors={errors}
                        >
                            Email
                        </InputField>
                    {
                        questions?.questions?.map((question) => {
                            if(question.question.type.toLowerCase() === questionTypeData.checkbox  ||  question.question.type.toLowerCase() === questionTypeData.radio){
                                return <SelectQuestion
                                            width="320px"
                                            name={`${question.questionId}`}
                                            control={register(`${question.questionId}` , {
                                                required: (question.question.type.toLowerCase() === questionTypeData.checkbox ? 'Please enter at least one' : 'Please chose one')
                                            })}
                                            errors={errors}
                                            type={`${question.question.type.toLowerCase()}`}
                                            options={question.question.options}
                                        >
                                            {`${question.question.text}`}
                                        </SelectQuestion>
                            }
                            else if(question.question.type.toLowerCase() === questionTypeData.short){
                                return <InputField
                                        width="320px"
                                        height="40px"   
                                        type='text'
                                        name={`${question.questionId}`}
                                        control={register(`${question.questionId}` , {
                                                required: 'Please enter the answer',
                                            }
                                        )}
                                        errors={errors}
                                    >
                                        {`${question.question.text}`}
                                    </InputField>
                            }else if(question.question.type.toLowerCase() === questionTypeData.long){
                                return <TextAreaField
                                        width="320px"
                                        height="140px"
                                        name={`${question.questionId}`}
                                        control={register(`${question.questionId}` , {
                                            required: 'Please enter the answer'
                                        })}
                                        errors={errors}
                                    >
                                        {`${question.question.text}`}
                                    </TextAreaField>
                            }else{
                                return <FileUpload
                                    name={`files.${question.questionId}.values`}
                                    file={watch(`files.${question.questionId}.values`)}
                                    setValue={setValue}
                                    width="320px"
                                    height='40px'
                                    row={true}
                                    required={true}
                                >
                                    {`${question.question.text}`}
                                </FileUpload>
                            }
                        })
                    }
                    </div>
                    <SubmitButton 
                        width='157px' 
                        height='40px'
                        disabled={isLoading}
                    >
                        Apply now
                    </SubmitButton>
                </form>
            </div>
        </div>  
    );
}

export default JoinUsForm;