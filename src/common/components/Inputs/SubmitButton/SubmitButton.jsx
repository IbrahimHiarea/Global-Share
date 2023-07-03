//import package
import React from 'react';

//import style
import style from './SubmitButton.module.css';

function SubmitButton ({children , width , height , disabled}){
    return (
        <input 
            className={style.submit}
            type='submit' 
            value={children}
            style={{width , height}}
            disabled={disabled}
        />
    );
}

export default SubmitButton;