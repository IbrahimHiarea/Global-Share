//import react
import React from 'react';
import { useNavigate , Outlet , NavLink } from 'react-router-dom';

//import components
import Avatar from '@mui/material/Avatar';

//import icon & image
import profileImage from '../../assets/images/profileImage/profile.png';
import {ReactComponent as MainLogo} from '../../assets/icons/mainLogo.svg';
import {BiHomeAlt2} from 'react-icons/bi';
import {FaTasks} from 'react-icons/fa';
import {CgProfile} from 'react-icons/cg'

//import style
import style from './DashboardLayout.module.css';

//static data
const drawerList = [
    {
        title: 'Home',
        path: 'home',
        icon: <BiHomeAlt2 />
    },
    {
        title: 'Tasks',
        path: 'task',
        icon: <FaTasks />
    },
    {
        title: 'profile',
        path: 'profile',
        icon: <CgProfile />
    }
];

function Header(){
    const nav = useNavigate();

    return (
        <header className={style.header}>
            <div 
                className={style['header-profile-button']}
                onClick={() => nav('profile')}
            >
                <Avatar 
                    alt="Twfek Ajeneh" 
                    src={profileImage}
                    sx={{width: '35px', height: '35px'}}
                />
                <div className={style['header-profile-info']}>
                    Twfek Ajeneh
                    <span> Specialist </span>
                </div>
            </div>
        </header>
    );
}

function Navbar(){
    const linkStyle = ({ isActive }) => {
        return {
            backgroundColor: isActive ? 'var(--primary-main)' : 'white' ,
            color: !isActive ? 'var(--natural-alpha-2) ' : 'var(--primary-white)',
        };
    };

    return (
        <nav className={style.navbar}>
            <div className={style['nav-logo']}>
                <MainLogo width={45} height={40}/>
            </div>

            <ul className={style['nav-list']}>
            {
                drawerList.map(({title , path , icon}) => (
                    <li key={title}>
                        <NavLink  
                            className={style['nav-link']}
                            style={linkStyle}
                            to={path}
                        >
                            {icon}
                        </NavLink>
                    </li>
                ))
            }
            </ul>
        </nav>
    );
}

function DashboardLayout (){
    return (
        <div className={style["dashboard-layout"]}>
            <Header />
            <Navbar />
            <Outlet />
        </div>
    );
}

export default DashboardLayout;