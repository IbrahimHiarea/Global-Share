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
import SquadPage from '../features/squads/SquadPage/SquadPage';
import PositionPage from '../features/Positions/PositionPage/PositionPage';
import EmailPage from '../features/emails/EmailPage/EmailPage';
import ApplicationPage from '../features/application/ApplicationPage/ApplicationPage';
import ApplicationDetails from '../features/application/ApplicationDetails/ApplicationDetails';
import VacancyPage from '../features/vacancies/VacancyPage/VacancyPage';
import AddVacancy from '../features/vacancies/AddVacancy/AddVacancy';
import EditVacancy from '../features/vacancies/EditVacancy/EditVacancy';
import QuestionPage from '../features/question/QuestionPage/QuestionPage';
import ErrorNotFound from '../app/NotFound/ErrorNotFound';
import JoinUsPage from '../app/HomePage/JoinUs/JoinUsPage/JoinUsPage';
import JoinUsForm from '../app/HomePage/JoinUs/JoinUsForm/JoinUsForm'

function AllRoute () {
    return (
        <Routes>

            {/* Home page */}
            <Route index element={ <HomePage /> }/>
            <Route path='/home' element={ <HomePage />}/>

            {/* Login page */}
            <Route path='/login' element = { <LoginPage /> } />

            {/* JoinUs page */}
            <Route path='/joinUs/:vacancyId' element = { <JoinUsPage /> } />

            {/* JoinUs Form page */}
            <Route path='/apply/:vacancyId' element = { <JoinUsForm /> } />

            {/* Dashboard page */}
            <Route path='/dashboard/' element = { <DashboardLayout /> }>
                {/* Home section */}
                <Route path='home' element={ <></> }/>
                
                {/* Profile sections  */}
                <Route path='profile/' element={<Outlet />}>
                    <Route index element={<ProfilePage />} />
                    <Route path='edit' element = { <EditProfile /> } />
                </Route>

                {/* Task sections */}
                <Route path='task' element = { <TaskPage /> } />

                {/* Volunteers section */}
                <Route path='volunteer' element={<VolunteerPage />} />

                {/* Squad section */}
                <Route path="squad" element={<SquadPage />} />

                {/* Position section */}
                <Route path="position" element={<PositionPage />} />

                {/* Email section */}
                <Route path='email' element={<EmailPage />}/>

                {/* Application section */}
                <Route path='application' element={<Outlet />}>
                    <Route index element={<ApplicationPage />} />
                    <Route path=':applicationId' element={<ApplicationDetails />} />
                </Route>

                {/* VacanciesPage section */}
                <Route path='vacancy/'>
                    <Route index element={<VacancyPage />}/>
                    <Route path='add' element={<AddVacancy />}/>
                    <Route path=':vacancyId/edit' element={<EditVacancy />} />
                </Route>

                {/* Question section */}
                <Route path='question' element={<QuestionPage />}/>

                <Route path="*" element={<ErrorNotFound />}/>
            </Route>
        </Routes>
    );  
}

export default AllRoute;