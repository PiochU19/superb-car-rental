import React, { useState, useEffect } from 'react';

import styles from './PanelMain.module.scss';

import Link from 'next/link';
import Router from 'next/router';

const isClient = () => typeof window !== "undefined";


const PanelMain = () => {

	const [loading, setLoading] = useState(true);
	const [employee, setEmployee] = useState('');

	if (isClient) {
		useEffect(() => {
			import('../../axios').then(axios => {
				const axiosInstance = axios.default;

				axiosInstance
					.get('user/client/')
					.then(res => {
						if (res.data.is_client) {
							Router.push('/');
						} else {
							setLoading(false);
							setEmployee(res.data);
						}
					})
					.catch(error => {
						Router.push('/');
					})
			})
		}, []);
	};

	return (
		<>
			{ loading
				?
				<></>
				:
				<div className={styles.PanelMain}>
					<div className={styles.PanelMainTitle}>
						<h1>Employee Panel -> {employee.first_name} {employee.last_name}</h1>
					</div>
					<div className={styles.ParentDiv}>
						<div>
							<Link href='panel/cars'><input className={styles.Button} type='submit' value='cars' /></Link>
						</div>
						<div>
							<Link href='panel/clients'><input className={styles.Button} type='submit' value='clients' /></Link>
						</div>
					</div>
					<div className={styles.ParentDiv}>
						<div>
							<Link href='panel/issues'><input className={styles.Button} type='submit' value='issues' /></Link>
						</div>
						<div>
							<Link href='panel/rents'><input className={styles.Button} type='submit' value='rents' /></Link>
						</div>
					</div>
					{ employee.is_superuser
						?
						<div className={styles.LastDiv}>
							<Link href='panel/employees'><input className={styles.Button} type='submit' value='employees' /></Link>
						</div>
						:
						<></>
					}
				</div>
			}
		</>
	)
}

export default PanelMain