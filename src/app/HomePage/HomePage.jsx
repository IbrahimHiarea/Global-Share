//import react
import React from 'react';

//import style
import style from './HomePage.module.css';

function HomePage (){
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