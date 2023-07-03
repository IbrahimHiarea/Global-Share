// import react
import React from 'react';
import { Route , Routes } from 'react-router-dom'

//import pages
import ProfilePage from '../features/profile/profile page/ProfilePage';
import EditProfile from '../features/profile/Edit Profile/EditProfile';
import LoginPage from '../features/auth/login page/LoginPage';
import HomePage from '../app/HomePage/HomePage';
import DashboardLayout from '../app/DashboardLayout/DashboardLayout';
import TaskPage from '../features/tasks/Task page/TaskPage';

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
                <Route path='profile' element = { <ProfilePage /> } >
                    <Route path='edit' element = { <EditProfile /> } />
                </Route>
                <Route path='task' element = { <TaskPage /> } />
            </Route>
        </Routes>
    );
}

export default AllRoute;