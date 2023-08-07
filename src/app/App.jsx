//import react
import React, { useEffect, useState } from 'react';

//import redux
import { useDispatch } from 'react-redux';
import {tokenAdded  , checkToken} from '../features/auth/AuthSlice';

//import route
import AllRoute from '../routes/allRoutes';
import SplashScreen from './SplashScreen/SplashScreen';
import SnackBar from '../features/snackBar/snackBar message/SnackBar'

// import style
import style from './App.module.css'

function App() {
	const [flag , setFlag] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const checkToken = async () => {
			if(localStorage.length!==0){
				dispatch(tokenAdded(localStorage.getItem('token')));
				// dispatch(checkToken());
			}
			setFlag(false);
		}

		checkToken();
	} , []);

	return (
		<div className={style.app}>
			{
				flag ?	<SplashScreen />
				: <AllRoute />
			}
			<SnackBar />
		</div>
	);
}

export default App;
