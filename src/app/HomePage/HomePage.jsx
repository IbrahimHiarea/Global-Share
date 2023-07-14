//import react
import React, { useState } from 'react';

//import style
import style from './HomePage.module.css';
import ConfirmPopUp from '../../common/components/ConfirmPopUp/ConfirmPopUp';

function HomePage (){

    return (
        <div className={style.home}>
            <ConfirmPopUp 
                title='Delete Volunteer ?'
                confirmText='delete'
            />
        </div>
    );
}

export default HomePage;