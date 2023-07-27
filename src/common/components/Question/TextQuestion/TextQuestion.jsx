//import package
import React from 'react';

//import style
import style from './TextQuestion.module.css';

function TextQuestion ({ title , answer }){
    return (
        <div className={style['question-card']}>
            <div className={style.title}>{title}</div>
            <div className={style.answer}>{answer}</div>
        </div>
    );
}

export default TextQuestion;