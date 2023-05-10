// import react
import React from 'react';
import { Route , Routes } from 'react-router-dom'

//import pages
import ProfilePage from '../features/profile/profile page/ProfilePage';
import LoginPage from '../features/auth/login page/LoginPage';
import HomePage from '../app/HomePage/HomePage';
import DashboardLayout from '../app/DashboardLayout/DashboardLayout';


function AllRoute () {
    return (
        <Routes>

            {/* home page */}
            <Route index element={ <HomePage /> }/>
            <Route path='/home' element={ <HomePage />}/>

            {/* Login page */}
            <Route path='/login' element = { <LoginPage /> } />

            {/* dashboard page */}
            <Route path='/dashboard/' element = { <DashboardLayout /> }>
                <Route path='home' element={ <></> }/>
                <Route path='profile' element = { <ProfilePage /> } />
                <Route  path='task' element = { <ProfilePage /> } />
            </Route>
        </Routes>
    );
}

export default AllRoute;