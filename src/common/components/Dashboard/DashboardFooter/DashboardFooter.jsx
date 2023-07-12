import React, { useState , useEffect } from 'react';

// import components 
import Button from '../../Inputs/Button/Button'

// import Icons 
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";

//import style
import style from './DashboardFooter.module.css';


function DashboardFooter({ dataLenght }) {
    
    const [pageCounter , setPageCounter] = useState(10);
    const [numberOfPages , setNumberOfPages] = useState(Math.ceil(dataLenght / pageCounter));
    const [numbers , setNumbers] = useState([1]);

    
    const handlePages = (e) => {
        setPageCounter(e.target.value);
    }
    
    useEffect(() => {
        setNumberOfPages(Math.ceil(dataLenght / pageCounter));
        const temp = [];
        for(let i=1;i<=numberOfPages;i++){
            temp.push(i);
        }
        setNumbers(temp);
    }, [pageCounter]);

    return (
        <div className={style['dashboard-footer']}>
            <div className={style['first-part']}>
                <div>Showing</div>
                <select className={style['page-counter']} onChange={handlePages}>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                </select>
                <div> Of {dataLenght}</div>
            </div>
            <div className={style['second-part']}>
                <Button backgroundColor="#F1F2F6" >
                    <IoIosArrowBack size="15px" color='#8B909A'/>
                </Button>
                {numbers?.map(title => {
                    return <Button backgroundColor="#F1F2F6" >
                        {title}
                    </Button>
                })}
                <Button backgroundColor="#F1F2F6" >
                    <IoIosArrowForward size="15px" color='#8B909A'/>
                </Button>
            </div>
        </div>
    );
}

export default DashboardFooter