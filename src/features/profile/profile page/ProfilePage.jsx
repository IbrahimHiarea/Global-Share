//import react
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//import redux
import { useSelector , useDispatch} from 'react-redux';
import {selectProfileStatus , fetchProfileDetails, selectProfileData} from '../profileSlice';

//import components
import Loader from '../../../common/components/Loader/Loader';
import Error from '../../../common/components/Error/Error';
import Button from '../../../common/components/Inputs/Button/Button'
import VolunteerStatus from '../../../common/components/StatusBoxes/VolunteerStatus/VolunteerStatus'
import { Avatar } from '@mui/material';

//import icon & image
import { HiOutlineMail } from "react-icons/hi";
import { IoIosNuclear } from "react-icons/io";
import { BsSend , BsTelephone , BsGift , BsPeople , BsPen , BsYinYang } from "react-icons/bs";
import profileImage from '../../../assets/images/profile.png';

//import utils
import { format } from 'date-fns';

//import style
import style from './ProfilePage.module.css';

//static data
const period = ['all'];

function ProfilePage (){
    const nav = useNavigate();
    const dispatch = useDispatch();

    const status = useSelector(selectProfileStatus);
    const data = useSelector(selectProfileData);

    useEffect(() => {
        const promise  = dispatch(fetchProfileDetails());

        return () => {
            promise.abort()
        }
    }, []);
    

    if(status === 'idle' || status === 'loading'){
        return (
            <div className={style['profile-page']}>
                <Loader />
            </div>
        );
    }

    else if(status === 'failed'){
        return (
            <div className={style['profile-page']}>
                <Error />
            </div>
        );
    }

    else{
        
        const otherPosition = data.positions.map((position) => {return position.position.name}).join(" • ");

        return (
            <div className={style['profile-page']}>
                <div className={style['profile-header']}>
                    <div className={style['header-background']}></div>
                    <div className={style['header-content']}>
                        <div className={style.image}>
                            <Avatar 
                                src={profileImage}
                                alt='Ahmad Alshahal' 
                                sx={{
                                    width: '137px', 
                                    height: '137px'
                                }} 
                            />
                        </div>

                        <div className={style['header-info']}>
                            <div className={style['header-name']}>
                                <h2>{`${data.firstName} ${data.middleName} ${data.lastName}`} <span>• {data.arabicFullName}</span></h2>
                                <VolunteerStatus width="70px" height="24px" volunteerStatus={data.gsStatus} />
                            </div>
                            <h3>Specialist Android Developer <span>• {data.email}</span></h3>
                        </div>

                        <Button 
                            width='80px' 
                            height='40px' 
                            onClick={() => nav('edit')}
                        >
                            edit
                        </Button>
                    </div>
                </div>
                <div className={style['profile-body']}>
                    <div className={style['first-body']}>
                        <BoxInfo
                            title="about"
                            info={data.bio}
                            isLink={false}
                            icon={<></>}
                        />
                        <div className={style.log}>
                            {period.map((item) => (
                                <WorkTimeCard 
                                    key={item}
                                    hours={data.volunteeredHours}
                                    tasks={data.tasksCompleted}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={style['second-body']}>
                        <div>
                            <BoxInfo
                                title="additional email"
                                info={data.additionalEmail}
                                isLink={false}
                                icon={<HiOutlineMail />}
                            />
                            <BoxInfo
                                title="appointlet"
                                info={data.appointlet}
                                isLink={true}
                                icon={<BsSend/>}
                            />
                        </div>
                        <div>
                            <BoxInfo
                                title="phone number"
                                info={data.phoneNumber}
                                isLink={false}
                                icon={<BsTelephone/>}
                            />
                            <BoxInfo
                                title="birth date"
                                info={format(new Date(data.joinDate) , 'MMM dd, yyyy')}
                                isLink={false}
                                icon={<BsGift/>}
                            />
                        </div>
                        <div>
                            <BoxInfo
                                title="squads"
                                info={
                                    <div className={style.squads}>
                                        <IoIosNuclear size={'30px'}></IoIosNuclear>
                                        <IoIosNuclear size={'30px'}></IoIosNuclear>
                                        <IoIosNuclear size={'30px'}></IoIosNuclear>
                                    </div>
                                }
                                isLink={false}
                                icon={<BsPeople/>}
                            />
                            <BoxInfo
                                title="resume"
                                info={
                                    <a 
                                        className={style.resume} 
                                        href="https://drive.google.com/u/0/uc?id=0Bx3C5sQdyet7a2dRZTlQSTFmT3RONmhNalZvX04xOC1pd2tj&export=download&resourcekey=0-DhYYRgMXbNKPUEpAh6ZNeQ" 
                                        target="_blank" 
                                        download 
                                        rel="noreferrer"
                                    >
                                        <Button>Click here to download</Button>
                                    </a>
                                }
                                isLink={false}
                                icon={<BsPen/>}
                            />
                        </div>
                        <BoxInfo
                            title="other positions"
                            info={otherPosition}
                            isLink={false}
                            icon={<BsYinYang />}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function WorkTimeCard({hours , tasks}){
    return (
        <>
            <h4>Overall Performance</h4>
            <div className={style['work-time']}>
                <div className={style.hour}>
                    <div>Working Hours</div>
                    <div>{hours} H</div>
                </div>
                <div className={style.task}>
                    <div>Tasks</div>
                    <div>{tasks}</div>
                </div>
            </div>
        </>
    );
}

function BoxInfo({title , info , isLink , icon}){
    return(
        <div className={style['box-info']}>
            <h4>{icon} {title}</h4>
            {
                isLink ? 
                <a href={info} className={style.about}>{info}</a> :
                <div className={style.about} >{info}</div>
            }
        </div>
    );
}

export default ProfilePage;