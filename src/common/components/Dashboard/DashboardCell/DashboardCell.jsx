//import react 
import React from 'react';
import clsx from 'clsx';

// import icons & image
import {MdNavigateNext , MdNavigateBefore} from 'react-icons/md';

//import static data
import {statusesData , recruitmentStatusData} from '../../../utils/selectorData'

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
        <div className={style['normal-cell']}> {value?.toLowerCase()} </div>
    );
}

export const StatusCell = ({status}) => {
    return (
        <div className={
            clsx(
                style['status-cell'], 
                {[style['status-cell-warning']]: status.toLowerCase()===statusesData.freeze},
                {[style['status-cell-error']]: status.toLowerCase()===statusesData.left}
            )
        }> 
        {status} 
        </div>
    );
}

export const RecruitmentStatusCell = ({recruitmentStatus}) => {
    return (
        <div className={
            clsx(
                style['recruitment-status-cell'],
                {[style['recruitment-status-cell-error']] : recruitmentStatus.toLowerCase()===recruitmentStatusData.refused},
                {[style['recruitment-status-cell-warning']] : recruitmentStatus.toLowerCase()===recruitmentStatusData.applied}
            )
        }>
            {recruitmentStatus}
        </div>
    );
}

export const ColoredCell = ({value}) => {
    return (
        <div className={style['colored-cell']} >{value}</div>
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