//import package
import React from 'react';

import {BsSquareFill , BsSquare} from "react-icons/bs";

//import style
import style from './RadioView.module.css';

function RadioView({ title , options , answer}){
    return (
        <div className={style.radio}>
            <h2>{title}?</h2>
            <div className={style.options}>
                {
                    options.map((opt , index) =>(
                        <div key={index} className={style.option}>
                            {index===0 && <BsSquareFill size='14px' color='var(--word-color)'/>}
                            {index!==0 && <BsSquare size='14px' color='var(--word-color)'/>}
                            <div>{opt}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default RadioView;