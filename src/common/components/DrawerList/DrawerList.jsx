//import react
import React, { useEffect, useRef, useState } from 'react';
import { NavLink , useNavigate} from 'react-router-dom';

//import components
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

//import style
import style from './DrawerList.module.css';

//static data
const drawerList = [
    {
        title: 'Home',
        path: 'home'
    },
    {
        title: 'Profile',
        path: 'profile'
    },
];

function DrawerList ({handleToggle}){
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const activeLink = useRef(-1);

    const nav = useNavigate();

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        handleToggle();
    };

    const linkStyle = ({ isActive } , index) => {
        if(isActive) activeLink.current = index
        return {
            width: '100%',
            height: '100%',
            display: 'inline-block',
            padding: '1px',
            zIndex: '2',
            color: !isActive ? 'var(--natural-2) ' : 'var(--primary-white)'
        };
    };

    useEffect(() => {
        setSelectedIndex(activeLink.current);
    }, [])

    return (
        <List
            sx={{
                padding: '67px 11px 0px 11px',
                marginTop: '65px',
                backgroundColor: 'var(--primary-white)',
                boxShadow: '-30px -280px 10000px -200px var(--primary-light) inset,60px -460px 1000px -200px var(--secondary-light) inset',
                height: '100%',
                margin: '29px 25px 30px 29px',
                borderRadius: '15px',
                display: 'flex' ,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <div>
                {
                    drawerList.map(({title , path} , index) => (
                        <ListItemButton
                            key={title}
                            selected={selectedIndex === index}
                            onClick={() => handleListItemClick(index)}
                            sx={{
                                padding: '8px 0px 0px 20px', 
                                height: '44px',
                                borderRadius: '27px',
                                marginBottom: '25px',
                                fontWeight: '400',
                                fontSize:'20px',
                                ":hover":{
                                    backgroundColor: 'var(--natural-alpha-7)',
                                },
                                "&.Mui-selected": {
                                    backgroundColor: "var(--primary-light) !important",
                                    fontWeight: '700'
                                }
                            }}
                        >             
                            <NavLink  
                                style={(e) => linkStyle(e , index)}
                                to={path}
                                >
                                {title}
                            </NavLink>           
                        </ListItemButton>
                    ))
                }
            </div>
            <div>
                <ListItemText 
                disableTypography
                sx={{
                    padding: '0px 0px 0px 20px', 
                    height: '44px',
                    borderRadius: '27px',
                    marginBottom: '10px',
                    fontWeight: '700',
                    fontSize: '20px',
                    color: 'white',
                }}>
                    <span 
                        className={style['log-out']}
                        onClick={() => nav('/login')}
                    >
                        Log out
                    </span>
                </ListItemText>
            </div>
        </List>
    );
}

export default DrawerList;