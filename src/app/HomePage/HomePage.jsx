//import react
import React from 'react';

import { useDispatch } from 'react-redux';
import { getTasksBySquad } from '../../features/tasks/taskSlice';

//import style
import style from './HomePage.module.css';

function HomePage (){

    // const dispatch = useDispatch();

    // dispatch(getTasksBySquad({squadId: 14}));

    return (
        <div className={style.home}>
            this is home
            {/* <AsyncSelectInputField
                width='240px'
                height='40px'
                name='position'
                placeholder='Position'
                defaultOptions={[]}
                control={control}
                required={'enter the position'}
                errors={errors}
                border={true}
                callBack={(data) => getSquadsData({...data})}
            /> */}
        </div>
    );
}

export default HomePage;