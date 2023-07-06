//import redux
import { configureStore } from '@reduxjs/toolkit';

//import slice reducer
import authReducer from '../features/auth/AuthSlice';
import snackBarReducer from '../features/snackBar/snackBarSlice';
import taskReducer from '../features/tasks/taskSlice';
import profileReducer from '../features/profile/ProfileSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		snackbar: snackBarReducer,
		task: taskReducer,
		profile: profileReducer,
	},
});
