//import redux
import { configureStore } from '@reduxjs/toolkit';

//import slice reducer
import authReducer from '../features/auth/AuthSlice';
import snackBarReducer from '../features/snackBar/snackBarSlice';
import taskReducer from '../features/tasks/taskSlice';
import profileReducer from '../features/profile/profileSlice';
import volunteerReducer from '../features/volunteers/VolunteerSlice';
import positionReducer from '../features/Positions/PositionSlice';
import emailReducer from '../features/emails/EmailSlice'
import squadReducer from '../features/squads/squadSlice';
import applicationReducer from '../features/application/ApplicationSlice';
import vacanciesReducer from '../features/vacancies/VacanciesSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		snackbar: snackBarReducer,
		task: taskReducer,
		profile: profileReducer,
		volunteer: volunteerReducer,
		position: positionReducer,
		email: emailReducer,
		squad: squadReducer,
		application: applicationReducer,
		vacancies: vacanciesReducer,
	},
});
