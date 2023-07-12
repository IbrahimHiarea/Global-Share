// import react
import React from 'react';
import { Outlet, Route , Routes } from 'react-router-dom'

//import pages
import ProfilePage from '../features/profile/profile page/ProfilePage';
import EditProfile from '../features/profile/Edit Profile/EditProfile';
import LoginPage from '../features/auth/login page/LoginPage';
import HomePage from '../app/HomePage/HomePage';
import DashboardLayout from '../app/DashboardLayout/DashboardLayout';
import TaskPage from '../features/tasks/Task page/TaskPage';
import VolunteerPage from '../features/volunteers/VolunteerPage/VolunteerPage';

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
                {/* home section */}
                <Route path='home' element={ <></> }/>
                
                {/* profile sections  */}
                <Route path='profile/' element={<Outlet />}>
                    <Route index element={<ProfilePage />} />
                    <Route path='edit' element = { <EditProfile /> } />
                </Route>

                {/* task sections */}
                <Route path='task' element = { <TaskPage /> } />

                {/* Volunteers section */}
                <Route path='volunteer' element={<VolunteerPage />} />
            </Route>
        </Routes>
    );  
}

export default AllRoute;