import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';

import styles from './Navbar.module.scss';

import Link from 'next/link';


const Navbar = () => {

	const [auth, setAuth] = useState(false);
	const [userType, setUserType] = useState("");

	useEffect(() => {
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
	}, []);


	return (
		<div className={styles.header}>
			<div className={styles.header_title}>
				<p><Link href='/'>Superb Car Rental</Link></p>
			</div>
			<div className={styles.header_navigation}>
				<div className={styles.header_navigation_about}><Link href='/about'>About</Link></div>
				<div className={styles.header_navigation_contact}><Link href='/contact'>Contact Us</Link></div>
				<div className={styles.header_navigation_login}>
					TU COS BEDZIE
				</div>
			</div>
		</div>
	)
}

export default Navbar