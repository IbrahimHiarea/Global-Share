//import react
import React from 'react';

//import style
import style from './HomePage.module.css';

import PositionPage from '../../features/Positions/PositionPage/PositionPage';

function HomePage (){

    return (
        <div className={style.home}>
            {/* this is home */}
            <PositionPage>
                
            </PositionPage>
        </div>
    );
}

export default HomePage;