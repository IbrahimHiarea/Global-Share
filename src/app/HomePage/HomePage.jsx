//import react
import React from 'react';
import {useForm} from 'react-hook-form';

//import components

//import style
import style from './HomePage.module.css';
import MultiSelectInputField from '../../common/components/Inputs/MultiSelectInputField/MultiSelectInputField';

function HomePage (){
    const {control , formState: {errors} , handleSubmit} = useForm({
        defaultValues:{
            member: ''
        }
    });

    const onSubmit = (data) => console.log(data);

    return (
        <div className={style.home} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <MultiSelectInputField
                    width='240px'
                    height='40px'
                    name='member'
                    placeholder='Member'
                    options={['twfek' , 'ibrahim' , 'ahmad' , 'zed' , 'ossama' , 'bader' , 'hiba' , 'boshra']}
                    control={control}
                />
                {/* Hello */}
            </form>
        </div>
    );
}

export default HomePage;