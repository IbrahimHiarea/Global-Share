// import react
import React , { useRef, useState }  from 'react';
import { useForm , useFieldArray } from 'react-hook-form';
import {useNavigate} from "react-router-dom"

//import redux
import { useDispatch } from 'react-redux';
import {createVacancy} from '../VacancySlice';
import { showMessage } from '../../snackBar/snackBarSlice';
import {getSquadsData , getQuestionsData} from '../../../common/utils/selectorAPI'

// import components 
import Button from '../../../common/components/Inputs/Button/Button';
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';
import TextAreaField from '../../../common/components/Inputs/TextAreaField/TextAreaField'
import Loader from '../../../common/components/Loader/Loader';
import AsyncSelectInputField from '../../../common/components/Inputs/AsyncSelectInputField/AsyncSelectInputField';

// import icons
import { CiSquareChevLeft } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";

//import style 
import style from './AddVacancy.module.css';

function AddVacancy() {
    const dispatch = useDispatch();
    const {control , register , formState : {errors} , handleSubmit } = useForm({
        defaultValues:{
            effect: '',
            brief: '',
            tasks: '',
            required: '',
            preferred: '',
            positionId: 0,
            questionsIds: [], //questions Id
        }
    });

    const { fields , append , remove } = useFieldArray({
        name: 'questionsIds',
        control, 
    });

    const navigate = useNavigate();

    const [isLoading , setIsLoading] = useState(false);

    const handelDelete = (index) => {
        remove(index);
    };

    const handelAdd = () => {
        append({
            value: '',
        });
    }

    const onSubmit = async (values) => {
        try{
            setIsLoading(true);
            console.log(values);
            await dispatch(createVacancy(values)).unwrap();
            dispatch(showMessage({message: 'Vacancy Added successfully' , severity: 1}));
            setIsLoading(false);
            navigate(-1);
        }catch(error){
            dispatch(showMessage({message: error , severity: 2}));
            setIsLoading(false);
        }
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
                    <AsyncSelectInputField
                        width='243px'
                        height='40px'
                        name='squad'
                        placeholder='Squad'
                        defaultOptions={[]}
                        control={control}
                        required={'enter the squad'}
                        errors={{[`squad.value`]: errors.squad?.value}}
                        border={true}
                        callBack={getSquadsData}
                    />
                    <AsyncSelectInputField
                        width='243px'
                        height='40px'
                        name='positionId'
                        placeholder='Position'
                        defaultOptions={[]}
                        control={control}
                        required={'enter the position'}
                        errors={{[`positionId.value`]: errors.positionId?.value}}
                        border={true}
                        callBack={getSquadsData} //getPositionData
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
                        name='required'
                        placeholder='Required Qualifications'
                        width='386px'
                        height='120px'
                        control={register('required' , {
                            required: 'Please enter the Required Qualifications',
                        })}
                        errors={errors}
                    />
                    <TextAreaField 
                        name='preferred'
                        placeholder='Preferred Qualifications'
                        width='386px'
                        height='120px'
                        control={register('preferred' , {
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
                                <AsyncSelectInputField
                                    width='443px'
                                    height='40px'
                                    name={`questionsIds.${index}.value`}
                                    placeholder='Select Question'
                                    defaultOptions={[]}
                                    control={control}
                                    required={'enter the question'}
                                    errors={{[`questionsIds.${index}.value`]: errors.questionsIds?.at(index)?.value}}
                                    border={true}
                                    callBack={getQuestionsData}
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
                        backgroundColor='var(--secondary-dark)'
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