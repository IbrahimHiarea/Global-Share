// import react
import React from "react";

//import components
import Dialog from '@mui/material/Dialog';

//import style
import style from './PopUp.module.css';

function PopUp ({children , open , handleClose}){
    
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
        >
            {children}
        </Dialog>
    );
}

export default PopUp;