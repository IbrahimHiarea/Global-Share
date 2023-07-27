//import package
import React from 'react';

import {BsCheck2Square , BsSquare} from "react-icons/bs";

//import style
import style from './CheckboxQuestion.module.css';

function CheckboxQuestion ({ title , options }){
    return (
        <div className={style['question-card']}>
            <div className={style.title}>{title}</div>
            <div className={style.options}>
                {
                    options?.map((opt) => {
                        return <div className={style.option}>
                            {
                                opt.active ? <BsCheck2Square size='17px' color='var(--word-color)'/> 
                                : <div className={style['not-active']}><BsSquare size='14px' color='var(--word-color)'/></div>
                            }
                            <div className={style.text}>{opt.text}</div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default CheckboxQuestion;