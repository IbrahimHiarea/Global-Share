//import package
import React from 'react';

import {BsSquareFill , BsSquare} from "react-icons/bs";

//import style
import style from './RadioQuestion.module.css';

function RadioQuestion ({ title , options }){
    return (
        <div className={style['question-card']}>
            <div className={style.title}>{title}</div>
            <div className={style.options}>
                {
                    options?.map((opt) => {
                        return <div className={style.option}>
                            {
                                opt.active ? <BsSquareFill size='14px' color='var(--word-color)'/> 
                                : <BsSquare size='14px' color='var(--word-color)'/>
                            }
                            <div className={style.text}>{opt.text}</div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default RadioQuestion;