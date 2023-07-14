// import react
import React, { cloneElement } from "react";

//import components
import Dialog from '@mui/material/Dialog';

//import style
import style from './PopUp.module.css';

function PopUp ({children , open , handleClose , index}){

    let component = <></>
    if(index && index < children.length) component = children[index]
    else component = children;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            {cloneElement(
                component,
                {handleClose: handleClose}
            )}
        </Dialog>
    );
}

export default PopUp;