//import package
import React , { useState , useEffect }  from 'react';

// import icons 
import {BsSquare} from "react-icons/bs";
import {CiSquareMinus , CiSquarePlus} from "react-icons/ci";

//import style
import style from './QuestionOptions.module.css';

function QuestionOptions({ questionId , setValue , currentOptions}) {

    const [options , setOptions] = useState(currentOptions);
    const [addOption , setAddOption] = useState(false);
    const [newOption , setNewOption] = useState('');
    const [error , setError] = useState(false);

    useEffect(() => {
        setError(false);
        options?.map((option) => {
            if(option.toLowerCase() === newOption.toLowerCase()){
                setError(true);
            }
        })
    },[newOption])
    
    useEffect(() => {
        setValue(`options${questionId}`,options);
    },[options])

    const handleChange = (event) => {
        setNewOption(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setOptions([...options , newOption]);
            setAddOption(false);
            setNewOption('');
        }
    };

    const handleDelete = (optionId) => {
        const newOptions = options?.filter((option,id) => {return id !== optionId});
        setOptions(newOptions);
    };

    return (
        <div className={style.options}>
            <div className={style.header}>
                <CiSquarePlus onClick={() => setAddOption(true)}  size="27px" color="#8B909A" cursor="pointer"/>
            </div>
            <div className={style.body}>
                {
                    options?.map((option,idx) => (
                        <div className={style.option} key={idx}>
                            <div> <BsSquare size="16px" color="var(--word-color)"/> </div>
                            <div>{option}</div>
                            <CiSquareMinus onClick={() => handleDelete(idx)} size="18px" color="#8B909A" cursor="pointer"/>
                        </div>
                    ))
                }
                {
                    addOption  &&  
                    <>
                        <div className={style.option}>
                            <div> <BsSquare size="16px" color="var(--word-color)"/> </div>
                            <input type="text" autoFocus onChange={handleChange} onKeyDown={handleKeyDown}/>
                        </div>
                        {   error  && 
                            <div className={style.error}>
                                This option is already exist
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    );
}

export default QuestionOptions;