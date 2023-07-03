// import react
import React, { useRef } from "react";

//import style
import style from './PopUp.module.css';

function PopUp ({children , open , close}){
    const divRef = useRef();

    const handleClose = () => {
        close({type: 'close'})
    }

    // const handleWindow = (e) => {
    //     if(e.target===divRef.current) close(false);
    // }

    return (
            open &&
            <div 
                className={style['pop-up']} 
                // onClick={handleWindow} 
                ref={divRef}
            >   
                {
                    React.cloneElement(
                        children , 
                        {close:handleClose},
                    )
                }
            </div>
    );
}

export default PopUp;