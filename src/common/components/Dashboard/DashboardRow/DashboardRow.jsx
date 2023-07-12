import React from 'react';

// import components 
import Button from '../../Inputs/Button/Button'

// import Icons 
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

//import style
import style from './DashboardRow.module.css';

function DashboardRow({id , firstType , secondType , isButton}) {
    
    console.log(firstType);
    return (
        <div className={style['dashboard-row']}>
            <div className={style.content}>
                <div className={style.id}>{id}</div>

                {firstType?.map(title => {
                    return <div>{title}</div>;
                })}

                {secondType?.map(title => {
                    return <div>
                        <span className={style[title.toLowerCase()]}>{title}</span>
                    </div>;
                })}
            </div>

            {isButton  &&  
            <div className={style.buttons}>
                <Button className="edit" backgroundColor="transparent">
                    <BiEdit size="18px" color="#413E3E"/>
                </Button>
                <Button className="delete" backgroundColor="transparent">
                    <BsTrash size="18px" color="var(--error-main)"/>
                </Button>
            </div>
            }
        </div>
    );
}

export default DashboardRow