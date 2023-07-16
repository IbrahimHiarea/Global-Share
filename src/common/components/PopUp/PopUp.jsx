// import react
import React  from "react";

//import components
import Dialog from '@mui/material/Dialog';

//import style
import style from './PopUp.module.css';

function PopUp ({children , open , handleClose , index}){

    let component = <></>
    if(typeof index === 'number' && index < children.length) component = children[index]
    else component = children;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            {component}
        </Dialog>
    );
}

export default PopUp;