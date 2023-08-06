//import react
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

//import redux
import { useSelector } from 'react-redux';
import {selectQuestionById} from '../../questionSlice';

//import components
import Loader from '../../../../common/components/Loader/Loader';
import TextAreaField from '../../../../common/components/Inputs/TextAreaField/TextAreaField';
import SelectInputField from '../../../../common/components/Inputs/SelectInputField/SelectInputField';
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';
import InputField from '../../../../common/components/Inputs/InputField/InputField';

// import icons & images
import { IoCloseOutline } from "react-icons/io5";
import { ImPlus , ImMinus} from 'react-icons/im';

//import static data
import {questionTypeData} from '../../../../common/utils/selectorData';

//import style
import style from './EditQuestion.module.css';

function EditQuestion({id , handleClose}){
    const data = useSelector(state => selectQuestionById(state , id));

    const {
        register, 
        formState : {errors , isDirty , dirtyFields}, 
        handleSubmit,
        control,
        watch,
        setError
    } = useForm({
        defaultValues:{
            text: data.text,
            type: {value: data?.type , label: data?.type},
            options: data?.options?.map(item => ({value: item})),
        },
        values: {
            text: data.text, 
            type: {value: data.type , label: data.type}, 
            options: data.options?.map(item => ({value: item}))
        }
    });

    const {
        fields: optionsFields,
        append: appendOption,
        remove: removeOption,
    } = useFieldArray({control , name: 'options'});

    const [isLoading , setIsLoading] = useState(false);

    const onSubmit = async (values) => {
        if(values.type.value===questionTypeData.radio || values.type.value===questionTypeData.checkbox){
            if(values.options.length < 2){
                setError('type',{ type: 'custom', message: 'at least two options must be entered' })
                return;
            }
        }
        setIsLoading(true);

        if(isDirty){
            const changed = {};
            for(let key of Object.keys(dirtyFields)){
                if(dirtyFields[key]){
                    changed[key] = values[key];
                }
            }
            console.log(changed);
        }
        //TODO:: 
        // dispatch add action to redux
    }

    useEffect(() => {
        if(watch('type')?.value!==questionTypeData.checkbox && watch('type')?.value!==questionTypeData.radio){
            removeOption();
        }
    } , [watch('type')]);

    if(isLoading===true){
        return (
            <div className={style['edit-question']}>
                <div className={style.center}>
                    <Loader transparent={true}/>
                </div>
            </div>
        );
    }

    return (
        <div className={style['edit-question']}>   
            <div className={style["edit-question-header"]}>
                <h2>edit question</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={handleClose}
                />
            </div>
            <form className={style['edit-question-body']} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.box}>
                    <TextAreaField
                        placeholder='question'
                        name='text'
                        width='390px'
                        height='75px'  
                        control={register('text' , {
                            required: 'Please enter the question'
                        })}
                        errors={errors}
                    />
                    <SelectInputField
                        width='390px'
                        height='40px'
                        name='type'
                        placeholder='type'
                        options={Object.values(questionTypeData)}
                        control={control}
                        required={'enter the type of question'}
                        errors={errors}
                        border={true}
                        menuHeight='90px'
                    />
                </div>
                {(watch('type')?.value===questionTypeData.radio || watch('type')?.value===questionTypeData.checkbox) &&
                    <div className={style.options}>
                        <div>
                            {
                                optionsFields.map((field , index) => (
                                    <div className={style.option} key={field.id}>
                                        <InputField
                                            type='text'
                                            name={`options.${index}.value`}
                                            placeholder='enter the option'
                                            width='250px'
                                            height='25px'
                                            control={register(`options.${index}.value` , {required: true})}
                                            errors={{[`options.${index}.value`]: errors.options?.at(index)?.value}}
                                        />
                                        <div className={style.delete} onClick={() => removeOption(index)}>
                                            <ImMinus  size={7} color='var(--natural-alpha-4)'/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div onClick={() => appendOption({value: ''})} className={style.add}>
                            <ImPlus size={8} color='var(--natural-alpha-4)'/>
                        </div>
                    </div>
                }
                <div className={style.buttons}>
                    <SubmitButton 
                        width='157px' 
                        height='40px'
                        disabled={isLoading || !isDirty}
                    >
                        edit question
                    </SubmitButton>
                </div>
            </form>
        </div>  
    );
}

export default EditQuestion;