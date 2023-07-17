// import react
import React, { useRef, useState } from 'react';
import ConfirmPopUp from '../../../../common/components/ConfirmPopUp/ConfirmPopUp';

function DeletePosition({id , handleClose}) {

    const isConfirmed = useRef(0);

    const setIsConfirmed = (value) => {
        isConfirmed.current = value;
        //TODO::
        if(value===true){
            console.log("delete "+ id);
            //dispatch delete action for redux
        }
        handleClose();
    }

    return (
        <>
            <ConfirmPopUp 
                title='Delete Position ?'
                confirmText='delete'
                setIsConfirm={setIsConfirmed}
            />
        </>
    );
}

export default DeletePosition;