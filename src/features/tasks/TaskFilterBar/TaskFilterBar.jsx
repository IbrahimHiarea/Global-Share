// import react
import React from "react";

//import components
import InputField from '../../../common/components/InputField/InputField';
import SelectInputField from "../../../common/components/SelectInputField/SelectInputField";

//import style
import style from './TaskFilterBar.module.css';

const filterOptions ={
    member : ['twfek' , 'ibrahim'],
    priorities: ['Normal' , 'Important' , 'Urgent'],
    complexities: ['Easy' , 'Medium' , 'Hard']
}

function TaskFilterBar ({register , formState , reset}){
    return (
        <form className={style['filter-bar']} >
            <legend>Filters :</legend>
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
                control={register('member')}
            />
            <SelectInputField
                width='200px'
                height='40px'
                name='priorities'
                placeholder='All Priorities'
                options={filterOptions.priorities}
                control={register('priorities')}
            />
            <SelectInputField
                width='200px'
                height='40px'
                name='complexities'
                placeholder='All Complexities'
                options={filterOptions.complexities}
                control={register('complexities')}
            />
            <span className={style.reset} onClick={() => reset(formState.defaultValues)}>
                Clear
            </span>
        </form>
    );
}

export default TaskFilterBar;