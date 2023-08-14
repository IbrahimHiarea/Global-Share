// import react
import React , { useRef, useState }  from 'react';
import { useForm , useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router';
import {useNavigate} from "react-router-dom"

//import redux
import { useSelector , useDispatch} from 'react-redux';
import {selectVacancyById , updateVacancy} from '../VacancySlice';
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
import style from './EditVacancy.module.css';

function EditVacancy() {
    const {vacancyId : id} = useParams();
    const dispatch = useDispatch();

    const data = useSelector(state => selectVacancyById(state , id));
    console.log(data);
    const {control , register , formState: {errors , isDirty , dirtyFields} , handleSubmit , unregister } = useForm({
        defaultValues:{
            effect: '',
            brief: '',
            tasks: '',
            required: '',
            preferred: '',
            positionId: 0,
            questionsIds: [], //questions Id
        },
        values: {...data}
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
        setIsLoading(true);
        if(isDirty){
            const changed = {};
            for(let key of Object.keys(dirtyFields)){
                if(dirtyFields[key]){
                    changed[key] = values[key];
                }
            }
            console.log(changed);
            try{
                await dispatch(updateVacancy({id , ...changed})).unwrap();
                dispatch(showMessage({message: 'Vacancy Edited successfully' , severity: 1}));
            }catch(error){
                dispatch(showMessage({message: error , severity: 2}));
                setIsLoading(false);
            }
        }
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
                    <AsyncSelectInputField
                        width='243px'
                        height='40px'
                        name='squad'
                        placeholder='Squad'
                        defaultOptions={[]}
                        control={control}
                        required={'enter the squad'}
                        errors={errors}
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
                        errors={errors}
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
                                    errors={errors}
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
                        disabled={isLoading || !isDirty}
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