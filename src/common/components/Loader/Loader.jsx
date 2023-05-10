// import React
import React from 'react';

//import MUI
import { CircularProgress } from '@mui/material';


function Loader (){
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--natural-alpha-6)',
            zIndex: '4',
            marginTop: '-38px'
        }}>
            <CircularProgress size='60px' thickness='4' sx={{
                color: 'var(--primary-main)',
                display: 'flex' ,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            </CircularProgress>
        </div>
    );
}

export default Loader;