// import react
import React, { useRef, useState } from 'react';
import ConfirmPopUp from '../../../../common/components/ConfirmPopUp/ConfirmPopUp';

function DeleteVolunteer({id , handleClose}){
    const isConfirmed = useRef(0);

    const setIsConfirmed = (value) => {
        isConfirmed.current = value;
        //TODO::
        if(value===true){
            console.log("delete "+ id);
        }
        handleClose();
    }

    return (
        <ConfirmPopUp 
            title='Delete Volunteer ?'
            confirmText='delete'
            setIsConfirm={setIsConfirmed}
        />
    );
}

export default DeleteVolunteer;