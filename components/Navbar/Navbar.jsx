import React, { useEffect, useState } from 'react';

import styles from './Navbar.module.scss';

import Link from 'next/link';

import LoginSVG from '../../assets/svgs/login.svg';
import UserSVG from '../../assets/svgs/user.svg';
import LogoutSVG from '../../assets/svgs/logout.svg';
import SettingsSVG from '../../assets/svgs/settings.svg';

const isClient = () => typeof window !== "undefined";


const Navbar = () => {

	const [auth, setAuth] = useState(false);
	const [userType, setUserType] = useState("");

	if (isClient) {
		useEffect(() => {
			import('../../axios.js').then(axios => {
				const axiosInstance = axios.default;
				
				axiosInstance
					.get('user/permissions/')
					.then(res => {
						setAuth(true);
						if (res.data.is_client) {
							setUserType("client");
						} else if (res.data.is_employee) {
							setUserType("employee");
						}
					})
					.catch(error => {
						if (error.response.status === 401) {
							axiosInstance
								.post('/token/refresh/', {
									refresh: localStorage.getItem('refresh'),
								})
								.then(response => {
									setAuth(true);
									localStorage.setItem('access_token', response.data.access);
									localStorage.setItem('refresh_token', response.data.refresh);
								})
								.catch(error => {
									localStorage.removeItem('access_token');
									localStorage.removeItem('refresh_token');
									axiosInstance.defaults.headers['Authorization'] = null;
									
									setAuth(false);
								});
						};
					});
			});
		}, []);
	}

	return (
		<div className={styles.header}>
			<div className={styles.header_title}>
				<p><Link href='/'>Superb Car Rental</Link></p>
			</div>
			<div className={styles.header_navigation}>
				<div className={styles.header_navigation_about}><Link href='/about'>About</Link></div>
				<div className={styles.header_navigation_contact}><Link href='/contact'>Contact Us</Link></div>
				<div className={styles.header_navigation_login}>
					{(() => {
						if (auth) {
							if (userType === 'client') {
								return (
									<div className={styles.header_svg}>
										<div className={styles.header_left_svg}> 
											<Link href='/profile'><UserSVG /></Link>
										</div>
										<div>
											<Link href='/logout'><LogoutSVG /></Link>
										</div>
									</div>
								)
							} else if (userType === 'employee') {
								return (
									<div className={styles.header_svg}>
										<div className={styles.header_left_svg}>
											<Link href='/panel'><SettingsSVG /></Link>
										</div>
										<div>
											<Link href='/logout'><LogoutSVG /></Link>
										</div>
									</div>
								)
							}
						} else {
							return (
								<Link href='/login'><LoginSVG /></Link>
							)
						}
					})()}
				</div>
			</div>
		</div>
	)
}

export default Navbar