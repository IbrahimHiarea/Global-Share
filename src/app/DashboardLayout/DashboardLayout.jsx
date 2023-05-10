//import react
import React from 'react';
import { Outlet } from 'react-router-dom';

//import components
import Navbar from '../../common/components/Navbar/Navbar';

//import style
import style from './DashboardLayout.module.css';

function DashboardLayout (){
    return (
        <div className={style["dashboard-layout"]}>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default DashboardLayout;