//import react
import React, { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';

//import components
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import DrawerList from '../DrawerList/DrawerList';

//import icon and image
import { VscMenu } from 'react-icons/vsc';
import image from '../../../assets/images/profileImage/profile.png';

// import style
import style from './Navbar.module.css';

function Navbar (){
    const nav = useNavigate();
    const location = useLocation();

    const [openDrawer , setOpenDrawer] = useState(false);

    const handleToggle = () => setOpenDrawer(state => !state);
    const getRouteName = () => {
        const parts = location.pathname.split("/");
        const index = parts.indexOf("dashboard");
        let target = parts[index+1];
        if(target==='profile') target = 'my '+ target;

        return target;
    }


    return (
        <div>
            <AppBar 
                position='relative' 
                sx={{
                        backgroundColor: '#ffffff', 
                        height: 60, 
                        justifyContent: 'center',
                        zIndex: 10,
                        marginBottom: '38px'
                    }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 , marginLeft: 2 }}
                        onClick={handleToggle}
                    >   
                        <VscMenu className={style['menu-icon']}/>
                    </IconButton>
                    <p className={style.title}>
                        {getRouteName()}
                    </p>
                    <IconButton  
                        sx={{ width: 40, height: 40 , p: 0 , marginRight: 3 }}
                        onClick={() => nav('profile')}
                    >
                        <Avatar 
                            alt="Abdulkader Attoura" 
                            src={image}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                open={openDrawer}
                onClose={handleToggle}
                sx={{
                    width: 320,
                    flexShrink: 0,
                    zIndex: 9,
                    [`& .MuiDrawer-paper`]: { 
                        width: 320, 
                        paddingTop: '60px',
                    },
                }}
            >
                <DrawerList 
                    handleToggle={handleToggle}
                />  
            </Drawer>
        </div>
    );
}

export default Navbar;