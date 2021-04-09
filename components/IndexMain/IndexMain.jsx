import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './IndexMain.module.scss';

import axios from 'axios';
const isClient = () => typeof window !== "undefined";

const IndexMain = () => {

	const[notLoading, setNotLoading] = useState(false);
	const[cars, setCars] = useState('');

	if (isClient) {
		useEffect(() => {
			axios
				.get('http://localhost:8000/api/car/')
				.then((res) => {
					setCars(res.data);
					setNotLoading(true);
				})
		}, []);
	}

	return (
		<div className={styles.indexMain}>
			<div className={styles.index_welcome}>
				<h1>Hi there!</h1>
			</div>
			<hr className={styles.line_between} />
			<div className={styles.index_benefits}>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
					<p>Your boss did not pay you the salary on time again?</p>
					<p>No worries, everybody will find an exclusive car they can afford for sure</p>
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
					<p>Family reunion tomorrow and wife is ashamed of ur Audi?</p>
					<p>Call us. The car will be ready in 12 hours</p>
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
					<p>So you are not from Lublin and you still want car from our rental?</p>
					<p>We will deliver your car to the adress indicated</p>
				</div>
			</div>
			<div className={styles.index_up}>
				{ notLoading ?
				<div className={styles.index_up_cars}>
					{cars.map((car) => (
						<div key={car.slug}>
							<Link className={styles.car_link} href={`/rent/${car.slug}`}>
								<div>
									<img className={styles.car_image} src={`http://localhost:8000${car.main_image}`} alt='Samochut' />
									<p>{car.brand} {car.model}</p>
									<p>{car.engine} {car.fuel_type} {car.hourse_power} hpa</p>
								</div>
							</Link>
						</div>
					))}
				</div>
				:
				<div>
					Loading...
				</div>
				}
			</div>
		</div>
	)
}

export default IndexMain