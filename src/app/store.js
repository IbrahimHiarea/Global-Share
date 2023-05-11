//import redux
import { configureStore } from '@reduxjs/toolkit';

//import slice reducer
import authReducer from '../features/auth/AuthSlice';
import snackBarReducer from '../features/snackBar/snackBarSlice';


export const store = configureStore({
	reducer: {
		auth: authReducer,
		snackbar: snackBarReducer,
	},
});
