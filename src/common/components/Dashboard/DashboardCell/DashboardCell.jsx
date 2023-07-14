//import react 
import React from 'react';
import clsx from 'clsx';

// import icons & image
import {MdNavigateNext , MdNavigateBefore} from 'react-icons/md';

// import style
import style from './DashboardCell.module.css';

export const HeaderCell = ({title}) => {
    return (
        <p className={style['header-cell']}>
            {title}
        </p>
    );
}

export const IdCell = ({id}) => {
    return (
        <div className={style['id-cell']}> {"#" + id} </div>
    );
}

export const NormalCell = ({value}) => {
    return (    
        <div className={style['normal-cell']}> {value} </div>
    );
}

export const StatusCell = ({status}) => {
    return (
        <div className={
            clsx(
                style['status-cell'], 
                {[style['status-cell-warning']]: status.toLowerCase()==='freeze'},
                {[style['status-cell-error']]: status.toLowerCase()==='left'}
            )
        }> 
        {status} 
        </div>
    );
}


export const NextArrow = () => {
    return (
        <div className={style['next-arrow']}>
            <MdNavigateNext color='var(--natural-1)' size='18px'/>
        </div>
    );
}

export const PreviousArrow = () => {
    return (
        <div className={style['next-arrow']}>
            <MdNavigateBefore color='var(--natural-1)' size='18px'/>
        </div>
    );
}