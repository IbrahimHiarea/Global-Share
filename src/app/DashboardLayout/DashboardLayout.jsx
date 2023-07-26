//import react
import React, { useState } from 'react';
import { useNavigate , Outlet , NavLink } from 'react-router-dom';

//import components
import Avatar from '@mui/material/Avatar';

//import icon & image
import profileImage from '../../assets/images/profileImage/profile1.png';
import {BiHomeAlt2} from 'react-icons/bi';
import {FaTasks} from 'react-icons/fa';
import {CgProfile} from 'react-icons/cg';
import {BsBookHalf} from 'react-icons/bs';
import {HiUserGroup} from 'react-icons/hi'
import {MdEmail} from 'react-icons/md';
import {SiGoogleanalytics} from 'react-icons/si';
import {IoIosArrowForward} from 'react-icons/io';
import {AiFillAppstore} from "react-icons/ai";

//import style
import style from './DashboardLayout.module.css';
import clsx from 'clsx';

//static data
const drawerList = [
    {
        title: 'Home',
        path: 'home',
        icon: <BiHomeAlt2 />
    },
    {
        title: 'task Management',
        path: 'task',
        icon: <FaTasks />
    },
    // {
    //     title: 'profile',
    //     path: 'profile',
    //     icon: <CgProfile />
    // },
    {
        title: 'Volunteer',
        path: 'volunteer',
        icon: <BsBookHalf />
    },
    {
        title: 'Squad',
        path: 'squad',
        icon: <HiUserGroup />
    },
    {
        title: 'Position',
        path: 'position',
        icon: <SiGoogleanalytics />
    },
    {
        title: 'Email',
        path: 'email',
        icon: <MdEmail />
    },
    {
        title: 'Application',
        path: 'application',
        icon: <AiFillAppstore />
    }
];


function Navbar(){
    const nav = useNavigate();
    const [isOpen , setIsOpen] = useState(false);

    const handleToggle = (e) => {
        e.stopPropagation();
        setIsOpen((state) => !state);
    }

    const handleClose = () => setIsOpen(false);

    const handleInfoClick = () => nav('profile');

    return (
        <>
            <div className={clsx(style.cover , {[style['cover-open']] : isOpen})} onClick={handleClose}></div>
            <nav className={
                    clsx(
                        style.navbar ,
                        {[style['navbar-open']] : isOpen}
                    )}
            >
                <div className={style.container}>
                    <div 
                        className={clsx(
                            style['navbar-profile-info'],
                            {[style['navbar-profile-info-open']] : isOpen}
                        )}
                        onClick={handleInfoClick}
                    >
                        <Avatar 
                            alt="Twfek Ajeneh" 
                            src={profileImage}
                            variant="rounded"
                            sx={{
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '12px'
                            }}
                        >T</Avatar>
                        <div className={clsx(
                            style['navbar-profile-info-name'],
                            {[style['navbar-profile-info-name-open']] : isOpen}
                            )}>
                            <span>hello 👋</span>
                            <p>Twfek Ajeneh</p>
                        </div>
                    </div>
                    <span onClick={handleToggle}> <IoIosArrowForward size='21px'/> </span>
                    <ul className={style['navbar-list']}>
                    {
                        drawerList.map(({title , path , icon}) => (
                            <li key={title} className={style['navbar-list-item']}>
                                <NavLink  
                                    className={({isActive}) => clsx(style['navbar-link'] , {[style['navbar-link-background']] : isActive} , {[style['navbar-link-background-open']] : isActive && isOpen})}
                                    to={path}
                                    onClick={handleClose}
                                >
                                    {icon} <span className={clsx(style['navbar-link-title'] , {[style['navbar-link-title-open']] : isOpen})}>{title}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </nav>
        </>
    );
}

function DashboardLayout (){
    return (
        <div className={style["dashboard-layout"]}>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default DashboardLayout;