//import react
import React, { useState } from 'react';

//import components
import SubmitButton from '../../../common/components/Inputs/SubmitButton/SubmitButton';
import TextField from '../../../common/components/TextField/TextField';
import Loader from '../../../common/components/Loader/Loader';

//import icon
import { HiOutlineMail } from "react-icons/hi";
import { IoIosNuclear } from "react-icons/io";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsSend , BsTelephone , BsGift , BsPeople , BsPen } from "react-icons/bs";

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
                        <div>
                            <div className={style['header-content']}>
                                <div className={style.image}>
                                    <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij6dtiHizH96qpCOe8WeXXP3yLyQJkPdGVg&usqp=CAU' alt='Profile Photo' sx={{width: '137px' , height: '137px'}}></Avatar>
                                </div>
                                <div className={style['header-info']}>
                                    <div className={style['header-name']}>
                                        <h2>Abdulkader Attoura <span>• أحمد الشَّهَّال</span></h2>
                                        <div>Active</div>
                                    </div>
                                    <h3>Specialist Android Developer <span>• ahmad.alshahal2@gmail.com</span></h3>
                                </div>
                            </div>
                        </div>
                        <SubmitButton width='80px' height='40px'>Edit</SubmitButton>
                    </div>
                    <div className={style['profile-body']}>
                        <div className={style['first-body']}>
                            <div className={style.about}>
                                <h4>About</h4>
                                <p>
                                    Short paragraphs are easier to read and understand. Writing experts recommend paragraphs of no more than 150 words in three to eight sentences. Paragraphs should never be longer than 250 words. Vary the lengths of your paragraphs to make them more interesting.
                                    Short paragraphs are easier to read and understand. Writing experts recommend paragraphs of no more than 150 words in three to eight sentences. Paragraphs should never be longer than 250 words. Vary the lengths of your paragraphs to make them more interesting.
                                </p>
                            </div>
                            <div>
                                <h4>This week</h4>
                                <div className={style['work-time']}>
                                    <div className={style.hour}>
                                        <div>Working Hours</div>
                                        <div>17H</div>
                                    </div>
                                    <div className={style.task}>
                                        <div>Tasks</div>
                                        <div>14</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style['second-body']}>
                            <div>
                                <div className={style.email}>
                                    <h4><HiOutlineMail color='#232360'></HiOutlineMail> Additional Email</h4>
                                    <div>ahmad.alshahal@gmail.com</div>
                                </div>
                                <div className={style.appointlet}>
                                    <h4><BsSend color='#232360'></BsSend> Appointlet</h4>
                                    <a href=''>https://www.figma.com/file/</a>
                                </div>
                            </div>
                            <div>
                                <div className={style.number}>
                                    <h4><BsTelephone color='#232360'></BsTelephone> Phone Number</h4>
                                    <div>+963951737433</div>
                                </div>
                                <div className={style.date}>
                                    <h4><BsGift color='#232360'></BsGift> Birth Date</h4>
                                    <div>Nov 26, 2001</div>
                                </div>
                            </div>
                            <div>
                                <div className={style.squad}>
                                    <h4><BsPeople color='#232360'></BsPeople> Squads</h4>
                                    <div>
                                        <IoIosNuclear size={'30px'}></IoIosNuclear>
                                        <IoIosNuclear size={'30px'}></IoIosNuclear>
                                        <IoIosNuclear size={'30px'}></IoIosNuclear>
                                    </div>
                                </div>
                                <div className={style.resume}>
                                    <h4><BsPen color='#232360'></BsPen> Resume</h4>
                                    <SubmitButton>Click here to downlaod</SubmitButton>
                                </div>
                            </div>
                            <div className={style['last-section']}>
                                <h4><AiOutlineThunderbolt color='#232360' size='20px'></AiOutlineThunderbolt> Other Positions</h4>
                                <div>
                                    Specialist UI Designer • Specialist Coordinator • Intern Analysist
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default ProfilePage;