import React, { useEffect } from 'react';

import Router from 'next/router';

import axiosInstance from '../../axios';


const LogoutMain = () => {

	useEffect(() => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		Router.push('/');
	}, []);

	return (
		<h1>
			Wait...
		</h1>
	)
}

export default LogoutMain