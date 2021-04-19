import React, { useEffect } from 'react';

import Router from 'next/router';

const isClient = () => typeof window !== "undefined";


const LogoutMain = () => {

	if (isClient) {
		useEffect(() => {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			import('../../axios.js').then(axios => {
				const axiosInstance = axios.default;

				axiosInstance.defaults.headers['Authorization'] = null;
			});
			Router.push('/');
		}, []);
	};

	return (
		<h1>
			Wait...
		</h1>
	)
}

export default LogoutMain