// import react
import React , { useState }  from 'react';
import { useForm } from 'react-hook-form';

// import components 
import InputField from '../../../../common/components/Inputs/InputField/InputField';
import SelectInputField from "../../../../common/components/Inputs/SelectInputField/SelectInputField";
import Button from '../../../../common/components/Inputs/Button/Button';
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';

// import icons
import { IoCloseOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";

//import style 
import style from './AddVolunteer.module.css';

const filterOptions ={
    squads: ['Radioactive' , 'Hamdi'],
    positions : ['Android Developer' , 'react Developer'],
}

function AddVolunteer() {

    const {control ,register , watch , formState , handleSubmit , unregister } = useForm({
        defaultValues:{
            firstName : '',
            lastName : '',
            email : '',
            password: '',
        }
    })

    const [positionsAndSquadsNumber , setPositionsAndSquadsNumber] = useState(1);
    const [positionsAndSquads , setPositionsAndSquads] = useState([0]);

    const handeDelete = (positionsAndSquadsId) => {
        const newPositionsAndSquads = positionsAndSquads.filter((id) => {return id !== positionsAndSquadsId});
        unregister([`positions${positionsAndSquadsId}`]);
        unregister([`squads${positionsAndSquadsId}`]);
        setPositionsAndSquads(newPositionsAndSquads);
    };

    const handeAdd = () => {
        setPositionsAndSquads([...positionsAndSquads , positionsAndSquadsNumber]);
        setPositionsAndSquadsNumber(positionsAndSquadsNumber + 1);
    }

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className={style["add-volunteer"]}>
            <div className={style["add-volunteer-header"]}>
                <h2>Add Volunteer</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    // onClick={close}
                />
            </div>
            <form className={style["add-volunteer-body"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.box}>
                    <InputField 
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                        width='183px'
                        height='40px'
                        control={register('firstName' , 
                            {
                                required: 'Please Enter First Name',
                            }
                        )}
                    />
                    <InputField 
                        type='text'
                        name='lastName'
                        placeholder='Last Name'
                        width='183px'
                        height='40px'
                        control={register('lastName' , 
                            {
                                required: 'Please Enter Last Name',
                            }
                        )}
                    />
                </div>
                <div className={style.box}>
                    <InputField 
                        type='email'
                        name='email'
                        placeholder='Email'
                        width='226px'
                        height='40px'   
                        control={register('email' , {
                                required: 'Please enter email',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "The email don't match the pattern"
                                },
                            }
                        )}
                    />
                    <InputField 
                        type='password'
                        placeholder='Password'
                        name='password'
                        width='183px'
                        height='40px'  
                        control={register('password' , {
                                required: 'Please enter password',
                                pattern: {
                                    value: /^(?!\s)(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,10}$/,
                                    message: 'Please enter a valid password'
                                }
                            }
                        )}
                    />
                </div>
                <div className={style.break}></div>
                <div className={style.positions}>
                    { 
                        positionsAndSquads.map((id) => {
                            return <div key={id}>
                                <div className={style.box}>
                                    <SelectInputField
                                        width='180px'
                                        height='40px'
                                        name={`squads${id}`}
                                        placeholder='All Squads'
                                        options={filterOptions.squads}
                                        control={control}
                                    />
                                    <SelectInputField
                                        width='210px'
                                        height='40px'
                                        name={`positions${id}`}
                                        placeholder='All Positions'
                                        options={filterOptions.positions}
                                        control={control}
                                    />
                                    <Button backgroundColor="rgba(234, 84, 85, 0.16)" width="40px" height="40px" onClick={() => handeDelete(id)}>
                                        <BsTrash size="18px" color='var(--error-main)'/>
                                    </Button>
                                </div>
                                <div className={style.break}></div>   
                            </div>
                        })
                    }
                </div>
                <div className={style.buttons}>
                    <SubmitButton 
                        width='157px' 
                        height='40px'
                        disabled={!formState.isValid}
                    >
                        Add Volunteer
                    </SubmitButton>
                </div>
            </form>
            <div className={style["add-button"]}>
                <Button backgroundColor="var(--secondary-dark)" width="202px" height="40px" onClick={handeAdd}>
                    Add Another Position
                </Button>
            </div>
        </div>
    );
}

export default AddVolunteer;