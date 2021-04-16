import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './RentsPanel.module.scss';

import BinSVG from '../../assets/svgs/bin.svg';


const RentsPanel = () => {

	const [rents, setRents] = useState('');

	useEffect(() => {
		loadRents();
	}, []);

	const loadRents = () => {
		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.get('rent/')
				.then(res => {
					setRents(res.data);
				})
				.catch(error => {
					Router.push('/panel');
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
					loadRents();
				})		
		});
	};

	const parseDate = (date) => {
		return new Date(date);
	};

	const validDate = (date) => {
		const d1 = parseDate(date);
		const today = new Date();
		if (d1 > today) {
			return true
		} else {
			return false
		}
	};

	return (
		<>
			{ rents 
				?
				<div className={styles.Container}>
					<div className={styles.Title}>
						<h1>Manage Rents</h1>
					</div>
					<div className={styles.Rents}>
						{rents.map((rent, index) => (
							<div className={styles.Rent} key={rent.id}>
								<div>
									<p>{index + 1}.</p>
								</div>
								<div>
									<p>{rent.car.brand} {rent.car.model}</p>
								</div>
								<div>
									<p>{rent.user.first_name} {rent.user.last_name}</p>
								</div>
								<div>
									<p>from {rent.rent_starts} to {rent.rent_ends}</p>
								</div>
								<div>
									{ validDate(rent.rent_starts)
										?
										<BinSVG className={styles.SVG} onClick={handleDelete} id={rent.id} />
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
		</>
	)
}

export default RentsPanel