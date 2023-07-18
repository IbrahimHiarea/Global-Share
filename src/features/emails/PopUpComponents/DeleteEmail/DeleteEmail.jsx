// import react
import React, { useRef, useState } from 'react';
import ConfirmPopUp from '../../../../common/components/ConfirmPopUp/ConfirmPopUp';

function DeleteEmail({id , handleClose}) {

    const isConfirmed = useRef(0);

    const setIsConfirmed = (value) => {
        isConfirmed.current = value;
        if(value===true){
            console.log("delete "+ id);
            //TODO::
            //dispatch delete action for redux
        }
        handleClose();
    }

    return (
        <>
            <ConfirmPopUp 
                title='Delete Email ?'
                confirmText='delete'
                setIsConfirm={setIsConfirmed}
            />
        </>
    );
}

export default DeleteEmail;