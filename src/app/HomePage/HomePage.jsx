//import react
import React from 'react';

//import style
import style from './HomePage.module.css';

import EmailPage from '../../features/emails/EmailPage/EmailPage';

function HomePage (){

    return (
        <div className={style.home}>
            {/* this is home */}
            <EmailPage>
                
            </EmailPage>
        </div>
    );
}

export default HomePage;