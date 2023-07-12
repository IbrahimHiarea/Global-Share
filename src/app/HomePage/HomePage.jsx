//import react
import React from 'react';

//import style
import style from './HomePage.module.css';

import DashboardRow from '../../common/components/Dashboard/DashboardRow/DashboardRow';
import DashboardHeader from '../../common/components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardFooter from '../../common/components/Dashboard/DashboardFooter/DashboardFooter'

function HomePage (){
    return (
        <div className={style.home} style={{display:'flex' , flexDirection: 'column'}}>
            {/* Hello to Home */}
            <DashboardHeader>
                {["ID" , "Full name" , "Squad" , "Position" , "Level" , "Status"]}
            </DashboardHeader>
            <DashboardRow 
                id="#1530"
                firstType={["Ahmad Al-Shahal" , "Radioactive" , "Android Developer" , "Specialist"]}
                secondType={["Freeze"]}
                isButton="true"
            >
            </DashboardRow>
            <DashboardRow 
                id="#1530"
                firstType={["twfek ajeneh" , "Bitch" , "hooker" , "Grand Master"]}
                secondType={["Active"]}
                isButton="true"
            >
            </DashboardRow>
            <DashboardRow 
                id="#1530"
                firstType={["Ossama Bazo" , "Bitch" , "Also a hooker" , "Expert"]}
                secondType={["Active"]}
                isButton="true"
            >
            </DashboardRow>
            <DashboardRow 
                id="#1530"
                firstType={["Ahmad Al-Shahal" , "Radioactive" , "Android Developer" , "Specialist"]}
                secondType={["Freeze"]}
                isButton="true"
            >
            </DashboardRow>
            <DashboardRow 
                id="#1530"
                firstType={["Ahmad Al-Shahal" , "Radioactive" , "Android Developer" , "Specialist"]}
                secondType={["Left"]}
                isButton="true"
            >
            </DashboardRow>
            <DashboardFooter
                dataLenght={50}
            ></DashboardFooter>
        </div>
    );
}

export default HomePage;