//import react
import React , {useState} from 'react';
import { useForm } from 'react-hook-form';

//import redux 
import { useSelector } from 'react-redux';
import {selectSquadById} from '../../squadSlice';

//import components
import InputField from '../../../../common/components/Inputs/InputField/InputField';
import SubmitButton from '../../../../common/components/Inputs/SubmitButton/SubmitButton';
import TextAreaField from '../../../../common/components/Inputs/TextAreaField/TextAreaField';
import FileUpload from '../../../../common/components/Inputs/FileUpload/FileUpload';
import Loader from '../../../../common/components/Loader/Loader';

//import icons & images
import { IoCloseOutline } from "react-icons/io5";

//import style
import style from './EditSquad.module.css';

function EditSquad({id , handleClose}){
    const data = useSelector((state) => selectSquadById(state , id));

    const {register , formState : {errors , isDirty , dirtyFields} , handleSubmit , watch , setValue} = useForm({
        defaultValues:{
            name: '',
            gsName: '',
            description: '',
            image: null,
        },
        values: {name: data.name , gsName: data.gsName , description: data.description , image: null}
    })

    const [isLoading , setIsLoading] = useState(false);

    const onSubmit = async (values) => {
        setIsLoading(true);
        
        if(isDirty || values.image){
            const changed = {};
            for(let key of Object.keys(dirtyFields)){
                if(dirtyFields[key]){
                    changed[key] = values[key];
                }
            }
            if(values.image) changed.image = values.image;
            console.log(changed);
            //TODO:: 
            // dispatch add action to redux
        }
    }

    if(isLoading===true){
        return (
            <div className={style["edit-squad"]}>
                <Loader transparent={true}/>
            </div>
        );
    }

    return (
        <div className={style['edit-squad']}>
            <div className={style["edit-squad-header"]}>
                <h2>edit squad</h2>
                <IoCloseOutline 
                    size='20px' 
                    color='var(--natural-alpha-1)' 
                    cursor='pointer' 
                    onClick={handleClose}
                />
            </div>
            <form className={style["edit-squad-body"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.box}>
                    <InputField 
                        type='text'
                        name='name'
                        placeholder='Name'
                        width='185px'
                        height='40px'
                        control={register('name' , {
                            required: 'Please Enter The Name',
                            pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "The name don't match the pattern"
                            }
                        })}
                        errors={errors}
                    />
                    <InputField 
                        type='text'
                        name='gsName'
                        placeholder='GS Name'
                        width='185px'
                        height='40px'
                        control={register('gsName' , {
                            required: 'Please Enter The GS Name',
                            pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "The name don't match the pattern"
                            }
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.box}>
                    <TextAreaField 
                        name='description'
                        placeholder='Description..'
                        width='390px'
                        height='120px'
                        control={register('description' , {
                            required: 'Please enter the description',
                        })}
                        errors={errors}
                    />
                </div>
                <div className={style.box}>
                    <FileUpload
                        name='image'
                        file={watch("image")}
                        setValue={setValue}
                        width="390px"
                        height='40px'
                        label='Upload Image'
                        types={["jpg", "png"]}
                        row={true}
                    />
                </div>
                <div className={style.buttons}>
                    <SubmitButton 
                        width='157px' 
                        height='40px'
                        disabled={(isLoading || (isDirty===false && watch('image')===null))}
                    >
                        Add Volunteer   
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

export default EditSquad;