//import react
import React, { useState } from 'react';

//import components
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';
import TextField from '../../../common/components/TextField/TextField';
import Loader from '../../../common/components/Loader/Loader';

//import icon


//import style
import style from './ProfilePage.module.css';

// import MUI
import { Avatar } from '@mui/material';

function ProfilePage (){

    const [loading , setLoading] = useState(false);

    return (
        <div className={style['profile-page']}>
            { loading  &&  <Loader></Loader> }
            { !loading  &&
                <>
                    <div className={style['profile-header']}>
                        <div className={style.cover}></div>
                        <div className={style['header-content']}>
                            <div className={style.image}>
                                <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij6dtiHizH96qpCOe8WeXXP3yLyQJkPdGVg&usqp=CAU' alt='Profile Photo' sx={{width: '137px' , height: '137px'}}></Avatar>
                            </div>
                            <h2>Abdulkader Attoura</h2>
                        </div>
                    </div>
                    <div className={style['profile-body']}>
                        <div className={style.box}>
                            <TextField title={'First Name'} value={'Abdulkader'}/>
                            <TextField title={'Middle name'} value={'-'}/>
                            <TextField title={'Last name'} value={'Attoura'}/>
                        </div>
                        <hr />
                        <div className={style.box}>
                            <TextField title={'Email'} value={'Abdulkader.attoura@gmail.com'}/>
                            <TextField title={'Additional Email'} value={'-'}/>
                            <TextField title={'Full name in arabic'} value={'عبدالقادر عطورة'}/>
                        </div>
                        <hr />
                        <div className={style['last-content']}>
                            <div className={style.box}>
                                <TextField title={'Position'} value={'Product Designer'}/>
                                <TextField title={'Level'} value={'Specialist'}/>
                                <TextField title={'Appointlet'} value={'https'}/>
                            </div>
                            <div className={style.box}>
                                <TextField title={'Birthday Date'} value={'26 - 11 - 2001'}/>
                                <TextField title={'Phone number'} value={'0956450108'}/>
                            </div>
                            {/* <div className={style.box}>
                                <TextField title={'Bio'} value={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere, qui, magni aliquid officiis numquam porro asperiores doloremque, recusandae incidunt autem vel esse labore aperiam error? Optio blanditiis quam odio magnam.'}/>
                                <TextField title={'Bla Bla'} value={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere, qui, magni aliquid officiis numquam porro asperiores doloremque, recusandae incidunt autem vel esse labore aperiam error? Optio blanditiis quam odio magnam.'}/>
                            </div> */}
                        </div>
                        <div className={style.button}>
                            <SubmitButton>Cancel</SubmitButton>
                            <SubmitButton>Save</SubmitButton>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default ProfilePage;