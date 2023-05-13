// import React
import React from "react";

//import components
import { ErrorMessage } from '@hookform/error-message';

// import style
import style from './InputWrapper.module.css';

function InputWrapper ({children , name , label , errors}){
    
    const renderMessage = ({message}) => {
        return <span className={style.error}>{message}</span>
    }
    
    return (
        <div className={style['input-wrapper']}>
            {errors?.[name] ?
                <ErrorMessage 
                    errors={errors} 
                    name={name}
                    render={renderMessage}
                />
                : renderMessage({message : ''})
            }
            {children}
            <label htmlFor={name} className={style.label}>
                {label}
            </label>
        </div>
    );
}

export default InputWrapper;