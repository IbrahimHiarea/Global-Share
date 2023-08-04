// import react
import React , { useRef, useState }  from 'react';
import { useForm } from 'react-hook-form';
import {useNavigate} from "react-router-dom"

// import components 
import InputField from '../../../common/components/Inputs/InputField/InputField';
import SelectInputField from "../../../common/components/Inputs/SelectInputField/SelectInputField";
import Button from '../../../common/components/Inputs/Button/Button';
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';
import TextAreaField from '../../../common/components/Inputs/TextAreaField/TextAreaField'
import Loader from '../../../common/components/Loader/Loader';
import QuestionOptions from '../../../common/components/Question/QuestionOptions/QuestionOptions'

// import icons
import { CiSquareChevLeft } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";

//import static data
import {levelData, questionTypeData} from '../../../common/utils/selectorData'

//import style 
import style from './EditVacancy.module.css';

function EditVacancy() {

    const {control , register , watch , setValue , formState : {errors} , handleSubmit , unregister } = useForm({
        defaultValues:{
            squad : '',
            position : '',
            brief : '',
            tasks : '',
            requiredQualifications: '',
            preferredQualifications: '',
            effect: '',
        }
    })

    const navigate = useNavigate();

    const [isLoading , setIsLoading] = useState(false);
    const QuestionsNumber = useRef(1);
    const [questions , setQuestions] = useState([0]);

    const handelDelete = (questionId) => {
        const newQuestions = questions.filter((id) => {return id !== questionId});
        unregister([`question${questionId}`]);
        unregister([`questionType${questionId}`]);
        unregister([`options${questionId}`]);
        setQuestions(newQuestions);
    };

    const handelAdd = () => {
        setQuestions([...questions , QuestionsNumber.current]);
        QuestionsNumber.current++;
    }

    const onSubmit = async (values) => {
        setIsLoading(true);
        console.log(values);
        //TODO:: 
        // dispatch add action to redux
    }

    if(isLoading===true){
        return (
            <div className={style['edit-vacancy-loader']}>
                <Loader  transparent={true}/>
            </div>
        );
    }

    return (
        <div className={style['edit-vacancy']}>
            <div className={style['edit-vacancy-header']}>
                <CiSquareChevLeft size="55px" color='#8B909A' cursor="pointer" onClick={() => navigate(-1)}/>
                <h1>Edit Vacancy</h1>
            </div>
            <form className={style["edit-vacancy-body"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.box}>
                    <SelectInputField
                        width='243px'
                        height='40px'
                        name='squad'
                        placeholder='Squad'
                        options={Object.values(levelData)}
                        control={control}
                        required={'enter the squad'}
                        errors={errors}
                        border={true}
                    />
                    <SelectInputField
                        width='243px'
                        height='40px'
                        name='position'
                        placeholder='Position'
                        options={Object.values(levelData)}
                        control={control}
                        required={'enter the position'}
                        errors={errors}
                        border={true}
                    />
                </div>
                <div className={style.break}></div>
                <div className={style.box}>
                    <TextAreaField 
                        name='brief'
                        placeholder='Brief'
                        width='386px'
                        height='120px'
                        control={register('brief' , {
                            required: 'Please enter the brief',
                        })}
                        errors={errors}
                    />
                    <TextAreaField 
                        name='tasks'
                        placeholder='Tasks'
                        width='386px'
                        height='120px'
                        control={register('tasks' , {
                            required: 'Please enter the tasks',
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.box}>
                    <TextAreaField 
                        name='requiredQualifications'
                        placeholder='Required Qualifications'
                        width='386px'
                        height='120px'
                        control={register('requiredQualifications' , {
                            required: 'Please enter the Required Qualifications',
                        })}
                        errors={errors}
                    />
                    <TextAreaField 
                        name='preferredQualifications'
                        placeholder='Preferred Qualifications'
                        width='386px'
                        height='120px'
                        control={register('preferredQualifications' , {
                            required: 'Please enter the Preferred Qualifications',
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.box}>
                    <TextAreaField 
                        name='effect'
                        placeholder='Effect'
                        width='796px'
                        height='110px'
                        control={register('effect' , {
                            required: 'Please enter the effect',
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.break}></div>
                <div className={style.questions}>
                    {
                        questions?.map((id) => (
                            <>
                                <div className={style.question} key={id}>
                                    <InputField 
                                        type='text'
                                        name={`question${id}`}
                                        placeholder='Question'
                                        width='443px'
                                        height='40px'
                                        control={register( `question${id}` , {
                                            required: 'Please Enter The question',
                                            pattern: {
                                                value: /^[A-Za-z ]+$/,
                                                message: "The question doesn't match the pattern"
                                            }
                                        })}
                                        errors={errors}
                                    />
                                    <SelectInputField
                                        width='243px'
                                        height='40px'
                                        name={`questionType${id}`}
                                        placeholder='Question Type'
                                        options={Object.values(questionTypeData)}
                                        control={control}
                                        required='enter the question type'
                                        errors={errors}
                                        border={true}
                                    />
                                    <Button backgroundColor="var(--error-background)" width="40px" height="40px" onClick={() => handelDelete(id)}>
                                        <BsTrash size="18px" color='var(--error-main)'/>
                                    </Button>
                                </div>
                                {
                                    (watch(`questionType${id}`)?.value === "checkbox"  ||  watch(`questionType${id}`)?.value === "radio")  &&  
                                    <QuestionOptions questionId={id} setValue={setValue} currentOptions={[]}/>
                                }
                            </>
                        ))
                    }
                </div>
                <div className={style.buttons}>
                    <SubmitButton 
                        width='192px' 
                        height='40px'
                        disabled={isLoading}
                    >
                        Edit Vacancy
                    </SubmitButton>
                </div>
            </form>
            <div className={style["add-button"]}>
                <Button backgroundColor="var(--primary-main)" width="192px" height="40px" onClick={handelAdd}>
                    Insert Question
                </Button>
            </div>
        </div>
    );
}

export default EditVacancy;