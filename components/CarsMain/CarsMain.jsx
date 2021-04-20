import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './CarsMain.module.scss';

import BinSVG from '../../assets/svgs/bin.svg';
import EditSVG from '../../assets/svgs/edit.svg';

const isClient = () => typeof window !== "undefined";


const CarsMain = () => {

	const [cars, setCars] = useState('');
	const [loading, setLoading] = useState(true);

	if (isClient) {
		useEffect(() => {
			import('../../axios.js').then(axios => {
				const axiosInstance = axios.default;

				axiosInstance
					.get('user/client/')
					.then(res => {
						if (res.data.is_client) {
							Router.push('/');
						}
					})
					.catch(error => {
						Router.push('/');
					})
			});

			loadCars();
		},[]);
	};

	const loadCars = () => {
		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.get('car/')
				.then(res => {
					setCars(res.data);
					setLoading(false);
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
				.delete(`car/delete/${id}`)
				.then(res => {
					loadCars();
				})
		});
	};

	return (
		<>
			{ loading
				?
				<></>
				:
				<div className={styles.CarsMain}>
					<div className={styles.CarsMainTitle}>
						<h1>Manage cars</h1>
					</div>
					<div className={styles.AddCar}>
						<Link href='/panel/cars/add'><input className={styles.Button} type='submit' value='add car' /></Link>
					</div>
					<div className={styles.Cars}>
						{cars.map(car => (
							<div key={car.id} className={styles.CarMain}>
								<div>
									<img className={styles.CarImg} src={`http://34.118.16.167${car.main_image}`} alt='Samochut'/>
	  							</div>
								<div>
									<p>{car.brand} {car.model} {car.generation}</p>
								</div>
								<div>
									<p>{car.body_type} {car.year_of_production}</p>
								</div>
								<div>
									<p>{car.engine} {car.fuel_type} {car.hourse_power} hpa</p>
								</div>
								<div>
									<p>{car.price_per_day} PLN</p>
								</div>
								<div>
									<Link href={`/panel/cars/${car.slug}`}><p><EditSVG className={styles.SVG}/></p></Link>
								</div>
								<div>
									<p><BinSVG className={styles.SVG} id={car.id} onClick={handleDelete}/></p>
								</div>
							</div>
						))}
					</div>
				</div>
			}
		</>
	)
}

export default CarsMain