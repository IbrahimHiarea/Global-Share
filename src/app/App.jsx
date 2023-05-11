//import react
import React, { useState } from 'react';

//import route
import AllRoute from '../routes/allRoutes';
import SplashScreen from './SplashScreen/SplashScreen';
import SnackBar from '../features/snackBar/snackBar message/SnackBar'

// import style
import style from './App.module.css'

function App() {
	const [flag , setFlag] = useState(false);

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
