// import react
import React from 'react';
import clsx from 'clsx';

//import static data
import {recruitmentStatusData} from '../../../utils/selectorData.js';

//import style
import style from './RecruitmentStatus.module.css';

function RecruitmentStatus({recruitmentStatus , width , height}){
    return (
        <div className={
            clsx(
                style['status-box'],
                {[style['status-box-warning']] : recruitmentStatus===recruitmentStatusData.applied},
                {[style['status-box-error']] : recruitmentStatus===recruitmentStatusData.refused}
            )}
            style={{width , height}}
        >
            {recruitmentStatus}
        </div>
    );
}

export default RecruitmentStatus;