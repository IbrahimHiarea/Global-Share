//import package
import React from 'react';
import { useForm } from 'react-hook-form';

// import components 
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';
import InputField from '../../../../common/components/Inputs/InputField/InputField';
import TextAreaField from '../../../../common/components/Inputs/TextAreaField/TextAreaField';
import SelectInputField from "../../../../common/components/Inputs/SelectInputField/SelectInputField";

//import style
import style from './AddTasks.module.css';

// import icons
import { IoCloseOutline } from "react-icons/io5";

const filterOptions ={
    member : ['twfek' , 'ibrahim'],
    priorities: ['Normal' , 'Important' , 'Urgent'],
    complexities: ['Easy' , 'Medium' , 'Hard']
}

function AddTasks (){

    const {control , register , formState: {errors} , handleSubmit } = useForm({
        defaultValues:{
            title: '',
            deadLine: '',
            description: '',
            importance: '',
            difficulty: '',
            link: '',
            assignee: ''
        }
    })

    const onSubmit = async (data) => {
        console.log(data);
        
    }

    return (
        <div className={style['add-tasks']}>
            <div className={style.header}>
                <h2>Create New Task</h2>
                <IoCloseOutline size={'18px'} cursor='pointer'></IoCloseOutline>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.box}>
                    <InputField 
                        type='text'
                        name='title'
                        placeholder='Title'
                        width='184px'
                        height='40px'
                        control={register('title' , 
                            {
                                required: 'Please enter task title',
                            }
                        )}
                        errors={errors}
                    />
                    <InputField 
                        type='date'
                        name='deadLine'
                        placeholder='DeadLine'
                        width='188px'
                        height='40px'
                        control={register('deadLine' , 
                            {
                                required: 'Please enter task deadLine',
                            }
                        )}
                        errors={errors}
                    />
                </div>
                <div className={style.box}>
                    <TextAreaField
                        id='description'
                        placeholder='Description...'
                        width='386px'
                        height='121px'
                        control={register('description')}
                    />
                </div>
                <div className={style.box}>
                    <SelectInputField
                        width='184px'
                        height='40px'
                        name='importance'
                        placeholder='Importance'
                        options={filterOptions.priorities}
                        control={control}
                        required='true'
                    />
                    <SelectInputField
                        width='184px'
                        height='40px'
                        name='difficulty'
                        placeholder='Difficulty'
                        options={filterOptions.complexities}
                        control={control}
                        required='true'

                    />
                </div>
                <div className={style.box}>
                    <InputField 
                        type='text'
                        name='link'
                        placeholder='Link'
                        width='386px'
                        height='40px'
                        control={register('link')}
                    />
                </div>
                <div className={style.box}>
                    <SelectInputField
                        width='229px'
                        height='40px'
                        name='assignee'
                        placeholder='Assignee'
                        options={filterOptions.member}
                        control={control}
                        required='true'
                    />
                    <div className={style.submit}>
                        <SubmitButton width='138px' height='40px'>Create Task</SubmitButton>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddTasks;