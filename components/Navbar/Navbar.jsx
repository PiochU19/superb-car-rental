import React, { useEffect, useState } from 'react';

import styles from './Navbar.module.scss';

import Link from 'next/link';

import LoginSVG from '../../assets/svgs/login.svg';
import UserSVG from '../../assets/svgs/user.svg';
import LogoutSVG from '../../assets/svgs/logout.svg';
import SettingsSVG from '../../assets/svgs/settings.svg';
import DatabaseSVG from '../../assets/svgs/database.svg';

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
						} else if (res.data.is_superuser) {
							setUserType("admin");
						} else if (res.data.is_employee) {
							setUserType('employee');
						}
					})
					.catch(error => {
						setAuth(false);
						localStorage.removeItem('access_token');
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
				<div className={styles.header_navigation_contact}><Link href='/contact'>Contact</Link></div>
				<div className={styles.header_navigation_login}>
					{(() => {
						if (auth) {
							if (userType === 'client') {
								return (
									<div className={styles.header_svg}>
										<div className={styles.header_left_svg}> 
											<Link href='/profile'><UserSVG className={styles.svg}/></Link>
										</div>
										<div>
											<Link href='/logout'><LogoutSVG className={styles.svg}/></Link>
										</div>
									</div>
								)
							} else if (userType === 'employee' || userType === 'admin') {
								return (
									<div className={styles.header_svg}>
										<div className={styles.header_left_svg}>
											<Link href='/panel'><SettingsSVG className={styles.svg}/></Link>
										</div>
										{(() => {
											if (userType === 'admin') {
												return (
													<div className={styles.header_middle_svg}>
														<Link href='http://localhost/admin/' target='_blank'><DatabaseSVG className={styles.svg}/></Link>
													</div>
												)
											}
										})()}
										<div className={styles.header_right_svg}>
											<Link href='/logout'><LogoutSVG className={styles.svg}/></Link>
										</div>
									</div>
								)
							}
						} else {
							return (
								<Link href='/login'><LoginSVG className={styles.svg}/></Link>
							)
						}
					})()}
				</div>
			</div>
		</div>
	)
}

export default Navbar