import React, {useState, useEffect} from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './ProfileMain.module.scss';

const isClient = () => typeof window !== "undefined";


const ProfileMain = () => {

	const [client, setClient] = useState('');
	const [rents, setRents] = useState('');

	if (isClient) {
		useEffect(() => {
			import('../../axios.js').then(axios => {
				const axiosInstance = axios.default;
				
				axiosInstance
					.get('user/client/')
					.then(res => {
						console.log(res.data);
						setClient(res.data);
					})
					.catch(error => {
						console.log(error.response);
					});
			});
		}, []);
	};

	return (
		<>
			{ client
				?
				<div className={styles.profileMain}>
					<div className={styles.profileMainLeft}>
						<div className={styles.profileMainLeftTitle}>
							<h1>{client.first_name} {client.last_name}</h1>
						</div>
						<div className={styles.profileMainLeftMain}>
							<div className={styles.profileMainLeftMainLeft}>
								email:
							</div>
							<div className={styles.profileMainLeftMainRight}>
								{client.email}
							</div>
						</div>
						<div className={styles.profileMainLeftMain}>
							<div className={styles.profileMainLeftMainLeft}>
								phone number:
							</div>
							<div className={styles.profileMainLeftMainRight}>
								{client.client.phone_number}
							</div>
						</div>
						<div className={styles.profileMainLeftMain}>
							<div className={styles.profileMainLeftMainLeft}>
								birth day:
							</div>
							<div className={styles.profileMainLeftMainRight}>
								{client.client.birth_day}
							</div>
						</div>
						<div className={styles.profileMainLeftMain}>
							<div className={styles.profileMainLeftMainLeft}>
								driver license:
							</div>
							<div className={styles.profileMainLeftMainRight}>
								{client.client.driver_license}
							</div>
						</div>
						<div className={styles.profileMainLeftMain}>
							<div className={styles.profileMainLeftMainLeft}>
								street:
							</div>
							<div className={styles.profileMainLeftMainRight}>
								{client.client.street}
							</div>
						</div>
						<div className={styles.profileMainLeftMain}>
							<div className={styles.profileMainLeftMainLeft}>
								street number:
							</div>
							<div className={styles.profileMainLeftMainRight}>
								{client.client.street_number}
							</div>
						</div>
						<div className={styles.profileMainLeftMain}>
							<div className={styles.profileMainLeftMainLeft}>
								city:
							</div>
							<div className={styles.profileMainLeftMainRight}>
								{client.client.city}
							</div>
						</div>
						<div className={styles.profileMainLeftMain}>
							<div className={styles.profileMainLeftMainLeft}>
								postal code:
							</div>
							<div className={styles.profileMainLeftMainRight}>
								{client.client.postal_code}
							</div>
						</div>
					</div>
					<div className={styles.profileMainRight}>
						lewo
					</div>
				</div>
				:
				<></>
			}
		</>
	)
}

export default ProfileMain