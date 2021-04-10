import React, {useState, useEffect} from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './ProfileMain.module.scss';

import DeleteSVG from '../../assets/svgs/bin.svg';

const isClient = () => typeof window !== "undefined";


const ProfileMain = () => {

	const [client, setClient] = useState('');
	const [rents, setRents] = useState([]);

	if (isClient) {
		useEffect(() => {
			load_rents();
		}, []);
	};

	const load_rents = () => {
		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;
			
			axiosInstance
				.get('user/client/')
				.then(res => {
					if (res.data.client) {
						setClient(res.data);
						setRents(res.data.user_rent);
					} else {
						Router.push('/');
					}
				})
				.catch(error => {
					Router.push('/');
				});
		});
	};

	const handleDelete = e => {
		const id = e.target.id;

		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.delete(`rent/delete/${id}`)
				.then(res => {
					load_rents();
				})
		});
	};

	const parse_date = (date) => {
		return new Date(date);
	};

	const valid_date = (date) => {
		const d1 = parse_date(date);
		const today = new Date();
		if (d1 > today) {
			return true
		} else {
			return false
		}
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
					{ rents.length !== 0
					?
					<div className={styles.profileMainRight}>
						<div className={styles.profileMainRightTitle}>
							<h1>Your rents</h1>
						</div>
						<div className={styles.profileMainRightRents}>
							{rents.map(rent => (
								<div className={styles.profileMainRightRent} key={rent.id}>
									<div>
										<img className={styles.profileMainRightRentImage} src={`http://localhost:8000${rent.car.main_image}`} alt='Samochut' />
									</div>
									<div>
										{rent.car.brand} {rent.car.model} {rent.car.generation}
									</div>
									<div>
										from {rent.rent_starts} to {rent.rent_ends}
									</div>
									<div>
										{rent.price} PLN
									</div>
									<div>
										{ valid_date(rent.rent_starts)
											?
											<DeleteSVG onClick={handleDelete} id={rent.id}/>
											:
											<></>
										}
									</div>
								</div>
							))}
						</div>
					</div>
					:
					<></>
					}
				</div>
				:
				<></>
			}
		</>
	)
}

export default ProfileMain