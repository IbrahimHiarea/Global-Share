//import react
import React , {useState , useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate  } from 'react-router-dom';
import { Controller } from "react-hook-form";

// import API 
import { useDispatch} from 'react-redux';
import { getSquadsData , postFeedback} from './homAPI';
import {showMessage}from '../../features/snackBar/snackBarSlice';

// import Components 
import Button from '../../common/components/Inputs/Button/Button'
import Avatar from '@mui/material/Avatar';
import SubmitButton from '../../common/components/Inputs/SubmitButton/SubmitButton';
import InputField from '../../common/components/Inputs/InputField/InputField';
import TextAreaField from '../../common/components/Inputs/TextAreaField/TextAreaField';
import SplashScreen from '../SplashScreen/SplashScreen';
import Error from '../../common/components/Error/Error';

// import icons 
import {ReactComponent as MainLogo } from '../../assets/icons/mainLogo.svg';
import {ReactComponent as TitleLogo} from '../../assets/icons/title.svg';
import { IoIosNuclear , IoIosArrowDown } from "react-icons/io";
import { BsFacebook , BsInstagram , BsTwitter , BsLinkedin} from "react-icons/bs";

//import style
import clsx from 'clsx';
import style from './HomePage.module.css';


function HomePage (){

    const nav = useNavigate();
    const dispatch = useDispatch();

    const {control , register , formState : {errors} , handleSubmit , reset} = useForm({
        defaultValues:{
            name : '',
            email: '',
            message : '',
        }
    })

    const [squadId , setSquadId] = useState(0);
    const [activeVacancy , setActiveVacancy] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    const [isError , setIsError] = useState(false);

    const [squads , setSquads] = useState([]);

    const handleLogin = () => {
        nav('/login');
    }

    const onSubmit = async (values) => {
        try{
            const controller = new AbortController();

            setIsLoading(true);

            await postFeedback({
                values: values,
                signal: controller.signal,
            }).then(() => {
                reset();
                dispatch(showMessage({message: 'Feedback sent successfully' , severity: 1}));
                
            }).catch((error) => {
                dispatch(showMessage({message: error.message , severity: 2}))
            });
            
            setIsLoading(false);

        }catch(error){
        }
    }

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);

        const controller = new AbortController();
        getSquadsData({
            signal: controller.signal,
            setIsError: {setIsError}
        }).then(squads => {
            setSquads(squads);
            setActiveVacancy(squads[0]?.name)
        }).catch(() => {
            setIsError(true);
        });
        
        setIsLoading(false);
        return () =>  controller.abort();  
    } , [])

    if(isLoading){
        return(
            <SplashScreen></SplashScreen>
        )
    }

    if(isError){
        return (
            <div className={style['error-page']}>
                <Error/>
            </div>
        )
    }

    return (
        <div className={style.home}>
            <div className={style.header}>
                <a href="home">
                    <div className={style.logo}>
                        <MainLogo/>
                        <TitleLogo/>
                    </div>
                </a>
                <ul className={style['main-vav']}>
                    <li><a href="" style={{fontWeight: '900'}}>Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#teams">Teams</a></li>
                    <li><a href="#joinUs">Join Us</a></li>
                    <Button 
                        width='100px' 
                        height='40px' 
                        color="white" 
                        backgroundColor="var(--primary-main)" 
                        onClick={handleLogin}
                    >
                        LOG IN
                    </Button>
                </ul>
            </div>
            <div className={style['home-section']}>
                <div className={style.title}>
                    Your <br/> future <br/> Portal
                </div>
                <p>Imagine a world were technology is a portal to make knowledge universally accessible</p>
                <div className={style.buttons}>
                    <Button 
                        width='100px' 
                        height='40px' 
                        backgroundColor="var(--primary-main)" 
                        color="white" 
                        onClick={handleLogin}
                    >
                        LOG IN
                    </Button>
                </div>
                <div className={style.info}>
                    <div> <span>+51</span> Member</div>
                    <div> <span>5</span>International projects</div>
                    <div> <span>5</span>Volunteering Opportunities</div>
                </div>
            </div>
            <div className={style['about-section']} id="about">
                <div>
                    <h1>About Us</h1>
                    <p>Using technology to remove academic and career barriers. Our mission is to empower communities with knowledge and opportunities. We bring together talented individuals to create impactful projects and innovative software for career advancement</p>
                </div>
            </div>
            <div className={style['teams-section']} id="teams">
                <h1>Meet Our Squads</h1>
                <div className={style.squad}>
                    {
                        squads.map((squad,index) => {
                            return <>
                                <div 
                                    className={
                                        clsx(
                                            style['normal-bar'] ,
                                            {[style['active-bar']] : squad.isOpen}
                                        )
                                    }
                                    onClick = {() => {
                                        const newSquads = [...squads];
                                        newSquads[index].isOpen = !newSquads[index].isOpen;
                                        setSquads(newSquads);
                                    }}
                                >
                                    <div className={style['bar-icon']}><IoIosNuclear size="70px" color="white"/></div>
                                    <div className={style['bar-text']}>
                                        <div>{squad.gsName}</div>
                                        <IoIosArrowDown size="40px"/>
                                    </div>
                                </div>
                                <div 
                                    className={
                                        clsx(
                                            style['squad-list'] ,
                                            {[style['squad-active-list']] : squad.isOpen}
                                        )
                                    }
                                >
                                    {
                                        squad?.positions?.map((postion) => {
                                            return <>
                                                {
                                                    postion?.users?.map((user) => {
                                                        return <div 
                                                            className={
                                                                clsx(
                                                                    style['card'] ,
                                                                    {[style['active-card']] : squad.isOpen}
                                                                )
                                                            }
                                                        >
                                                            <Avatar 
                                                                src={user.imgUrl}
                                                                variant="rounded"
                                                                alt="User Image"
                                                                sx={{
                                                                    width: '80px', 
                                                                    height: '80px', 
                                                                    borderRadius: '12px'
                                                                }}
                                                            ></Avatar>
                                                            <div className={style.name}>{user.user.firstName + user.user.lastName}</div>
                                                            <div className={style.position}>{squad.positions.name}</div>
                                                        </div>
                                                    })
                                                }
                                            </>
                                        })
                                    }
                                </div>
                            </>

                        })
                    }
                </div>
                
            </div>
            <div className={style['join-us-section']} id="joinUs">
                <h1>JOIN US</h1>
                <div className={style['vacancy-bar']}>
                    {
                        squads?.map((squad,index) => {
                            return <div 
                                className={
                                    clsx(
                                        style['normal-vacancy'] ,
                                        {[style['active-vacancy']] : activeVacancy.toLowerCase() === squad.name.toLowerCase()}
                                    )
                                }
                                onClick = {() => {
                                    setActiveVacancy(squad.name)
                                    setSquadId(index);
                                }}
                            >
                                {squad.name}
                            </div>
                        })
                    }
                </div>
                <div className={style['vacancy-options']}>
                    {
                        squads[squadId]?.positions?.map((position) => {
                            return <div className={style['vacancy-option']} onClick={() => {
                                nav(`/joinUs/${position?.vacancies[0]?.id}`);
                            }}>
                                {position.name}
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={style['contact-us-section']} id="contactUs">
                <div>
                    <h1>CONTACT US</h1>
                    <form className={style.form}  onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            width="327px"
                            height="40px"
                            type='text'
                            placeholder='Enter Name'
                            name={'name'}
                            control={register('name' , {
                                    required: 'Please enter your name',
                                }
                            )}
                            errors={errors}
                        >
                            Name
                        </InputField>
                        <InputField
                            width="327px"
                            height="40px"   
                            type='email'
                            placeholder='Enter Email'
                            name={'email'}
                            control={register('email' , {
                                    required: 'Please enter your email',
                                }
                            )}
                            errors={errors}
                        >
                            Email
                        </InputField>
                        <TextAreaField
                            width="327px"
                            height="140px"
                            placeholder='Message'
                            name='message'  
                            control={register('message' , {
                                required: 'Please enter the message'
                            })}
                            errors={errors}
                        />
                        <SubmitButton 
                            width='157px' 
                            height='40px'
                            disabled={isLoading}
                        >
                            SEND
                        </SubmitButton>
                    </form>
                </div>
            </div>
            <div className={style.footer}>
                <div>
                    <div className={style['footer-logo']}>
                        <MainLogo/>
                        <TitleLogo/>
                    </div>
                    <h1>Your future Portal</h1>
                    <Button 
                        width='100px' 
                        height='40px' 
                        backgroundColor="white" 
                        color="var(--primary-main)" 
                        onClick={handleLogin}
                    >
                        LOG IN
                    </Button>
                </div>
                <div>
                    <h2>SITEMAP</h2>
                    <ul className={style['footer-nav']}>
                        <li><a href="" style={{fontWeight: '900' , color: 'white'}}>Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#teams">Teams</a></li>
                        <li><a href="#joinUs">Join Us</a></li>
                    </ul>
                    <div className={style['footer-icons']}>
                        <a href="https://www.facebook.com/GlobalSharePortal" target="_blank"><BsFacebook color="white" size="25px"/></a>
                        <a href="https://www.instagram.com/globalshareportal/" target="_blank"><BsInstagram color="white" size="25px"/></a>
                        <a href="https://twitter.com/globalshareport" target="_blank"><BsTwitter color="white" size="25px"/></a>
                        <a href="https://www.linkedin.com/company/globalshareportal" target="_blank"><BsLinkedin color="white" size="25px"/></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;