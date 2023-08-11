// import react
import React , { useRef, useState }  from 'react';
import { useForm , useFieldArray } from 'react-hook-form';
import {useNavigate} from "react-router-dom"

// import components 
import SelectInputField from "../../../common/components/Inputs/SelectInputField/SelectInputField";
import Button from '../../../common/components/Inputs/Button/Button';
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';
import TextAreaField from '../../../common/components/Inputs/TextAreaField/TextAreaField'
import Loader from '../../../common/components/Loader/Loader';

// import icons
import { CiSquareChevLeft } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";

//import static data
import {levelData, questionTypeData} from '../../../common/utils/selectorData'

//import style 
import style from './AddVacancy.module.css';

function AddVacancy() {

    const {control , register , formState : {errors} , handleSubmit } = useForm({
        defaultValues:{
            squad : '',
            position : '',
            brief : '',
            tasks : '',
            requiredQualifications: '',
            preferredQualifications: '',
            effect: '',
        }
    });

    const { fields , append , remove } = useFieldArray({
        name: 'questions',
        control, 
    });

    const navigate = useNavigate();

    const [isLoading , setIsLoading] = useState(false);

    const handelDelete = (index) => {
        remove(index);
    };

    const handelAdd = () => {
        append({
            type: '',
        });
    }

    const onSubmit = async (values) => {
        setIsLoading(true);
        console.log(values);
        //TODO:: 
        // dispatch add action to redux
    }

    if(isLoading===true){
        return (
            <div className={style['add-vacancy-loader']}>
                <Loader  transparent={true}/>
            </div>
        );
    }

    return (
        <div className={style['add-vacancy']}>
            <div className={style['add-vacancy-header']}>
                <CiSquareChevLeft size="55px" color='#8B909A' cursor="pointer" onClick={() => navigate(-1)}/>
                <h1>Add Vacancy</h1>
            </div>
            <form className={style["add-vacancy-body"]} onSubmit={handleSubmit(onSubmit)}>
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
                        fields?.map((field , index) => (
                            <div className={style.question} key={field.id}>
                                <SelectInputField
                                    width='443px'
                                    height='40px'
                                    name={`questions.${index}.type`}
                                    placeholder='Select Question'
                                    options={Object.values(questionTypeData)}
                                    control={control}
                                    required='enter the question'
                                    errors={errors}
                                    border={true}
                                />
                                <div className={style['delete-button']} onClick={() => handelDelete(index)}>
                                    <BsTrash size="18px" color='var(--error-main)'/>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={style.buttons}>
                    <SubmitButton 
                        width='192px' 
                        height='40px'
                        disabled={isLoading}
                    >
                        Add Vacancy
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

export default AddVacancy;