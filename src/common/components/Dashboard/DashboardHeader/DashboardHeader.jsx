import React from 'react';

//import style
import style from './DashboardHeader.module.css';

function DashboardHeader({children}) {
    return (
        <div className={style['dashboard-header']}>

            {children?.map(title => {
                return <div>{title}</div>;
            })}

        </div>
    );
}

export default DashboardHeader