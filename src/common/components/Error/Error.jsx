// import React
import React from 'react';

//import components
import { ReactComponent as ErrorIcon } from '../../../assets/icons/error.svg';

//import style
import style from './Error.module.css';

function Error (){
    return (
        <div className={style.error}>
            <ErrorIcon 
                width='250px' 
                height='250px'
            />
            <p>Something went wrong!! try again</p> 
        </div>  
    );
}

export default Error;