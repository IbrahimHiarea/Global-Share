//import react
import React , {useRef} from 'react';

//import components
import ConfirmPopUp from '../../../../common/components/ConfirmPopUp/ConfirmPopUp';

function DeleteVacancies({id , handleClose}){
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
                title='Delete Vacancy ?'
                confirmText='delete'
                setIsConfirm={setIsConfirmed}
            />
        </>
    )
}

export default DeleteVacancies;