//import react
import React, { useState } from "react";

//import components
import { ErrorMessage } from "@hookform/error-message";

//import style
import style from './SelectInputField.module.css';

function SelectInputField({
        children,
        width,
        height,
        name,
        options,
        placeholder,
        control,
        errors
    }){
    return (
        <div className={style['select-input']}>
            {errors && 
                <ErrorMessage 
                    errors={errors} 
                    name={name}
                    render={({ message }) => <span className={style.error}>{message}</span>}
                />
            }
            <select 
                id={name}
                name={name} 
                className={style.select}
                style={{width , height}}     
                {...control}           
            >
                <option 
                    value="" 
                    disabled 
                    // selected
                >{placeholder}</option>
            {
                options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }</select>
            <label htmlFor={name} className={style.label}>
                {children}
            </label>
        </div>
    );
}

export default SelectInputField;