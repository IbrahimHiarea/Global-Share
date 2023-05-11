// import React
import React from 'react';

// import style
import style from './InputField.module.css'
import { ErrorMessage } from '@hookform/error-message';

function InputField ({
                children,  
                type,
                name,
                placeholder, 
                autoFocus, 
                disabled,
                width, 
                height,
                control,
                errors
            }){
    return (
        <div className={style['input-field']}>
            {errors && 
                <ErrorMessage 
                    errors={errors} 
                    name={name}
                    render={({ message }) => <span className={style.error}>{message}</span>}
                />
            }
            <input 
                id={name}
                className={style.input}
                type={type}
                placeholder={placeholder}
                autoFocus={autoFocus}
                readOnly={disabled}
                style={{width , height}}
                {...control}
            />
            <label htmlFor={name} className={style.label}>
                {children}
            </label>
        </div>
    );
}

export default InputField;