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
					.then((res) => {
						setAuth(true);
						if (res.data.is_client) {
							setUserType("client");
						} else if (res.data.is_employee) {
							setUserType("employee");
						}
					})
					.catch((error) => {
						setAuth(false);
					})
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
									<div>
										<Link href='/profile' className={styles.header_left_svg}><UserSVG /></Link>
										<Link href='/logout'><LogoutSVG /></Link>
									</div>
								)
							} else if (userType === 'employee') {
								return (
									<div>
										<Link href='/panel'><div className={styles.header_left_svg}><SettingsSVG /></div></Link>
										<Link href='/logout'><LogoutSVG /></Link>
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