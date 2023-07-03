// import React
import React from 'react';

//import components
import InputWrapper from '../InputWrapper/InputWrapper';

// import style
import style from './InputField.module.css'

function InputField ({
                children, type, name,
                placeholder, autoFocus, width, 
                height, control, errors
            }){
    return(
        <InputWrapper name={name} label={children} errors={errors}>
            <input 
                id={name}
                className={style.input}
                type={type}
                placeholder={placeholder}
                autoFocus={autoFocus}
                style={{
                    width, 
                    height,
                    borderColor: errors?.[name] ? 'var(--error-main)' : ''
                }}
                {...control}
            />
        </InputWrapper>
    );
}

export default InputField;