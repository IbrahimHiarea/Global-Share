// import react
import React from "react";

//import components
import InputField from '../../../common/components/Inputs/InputField/InputField';
import SelectInputField from "../../../common/components/Inputs/SelectInputField/SelectInputField";

//import style
import style from './TaskFilterBar.module.css';

const filterOptions ={
    member : ['twfek' , 'ibrahim'],
    priorities: ['Normal' , 'Important' , 'Urgent'],
    complexities: ['Easy' , 'Medium' , 'Hard']
}

function TaskFilterBar ({register , formState , reset , control}){
    return (
        <form className={style['filter-bar']} onSubmit={(e) => e.preventDefault()} >
            <InputField 
                type='text'
                name='search'
                placeholder='Search'
                width='277px'
                height='40px'
                control={register('search')}
            />
            <SelectInputField
                width='200px'
                height='40px'
                name='member'
                placeholder='Radioactive'
                options={filterOptions.member}
                control={control}
            />
            <SelectInputField
                width='200px'
                height='40px'
                name='priorities'
                placeholder='All Priorities'
                options={filterOptions.priorities}
                control={control}
            />
            <SelectInputField
                width='200px'
                height='40px'
                name='complexities'
                placeholder='All Complexities'
                options={filterOptions.complexities}
                control={control}
            />
            <span className={style.reset} onClick={() => reset(formState.defaultValues)}>
                Clear
            </span>
            <span className={style['inner-border']}></span>
        </form>
    );
}

export default TaskFilterBar;