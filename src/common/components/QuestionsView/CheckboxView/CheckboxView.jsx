//import package
import React from 'react';

import {BsCheck2Square , BsSquare} from "react-icons/bs";

//import style
import style from './CheckboxView.module.css';

function CheckboxView ({title , options , answer}){
    return (
        <div className={style.checkbox}>
            <h2>{title}?</h2>
            <div className={style.options}>
                {
                    options.map((opt , index) => ( //change the key of the element and the answers
                        <div key={index} className={style.option}>
                            {index%2!==0 && <BsSquare size='14px' color='var(--word-color)'  style={{marginLeft: '.1rem'}}/>}
                            {index%2===0 && <BsCheck2Square size='17px' color='var(--word-color)'/> }
                            <div>{opt}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default CheckboxView;