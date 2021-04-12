import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './CarsMain.module.scss';

import BinSVG from '../../assets/svgs/bin.svg';

const isClient = () => typeof window !== "undefined";


const CarsMain = () => {

	const [cars, setCars] = useState('');
	const [loading, setLoading] = useState(true);

	if (isClient) {
		useEffect(() => {
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
						<Link href='panel/cars/add'><input className={styles.Button} type='submit' value='add car' /></Link>
					</div>
					<div className={styles.Cars}>
						{cars.map(car => (
							<div key={car.id}>
								<div className={styles.CarMain}>
									<div>
										<img className={styles.CarImg} src={`http://localhost:8000${car.main_image}`} alt='Samochut'/>
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
										<p>edit</p>
									</div>
									<div>
										<p><BinSVG className={styles.SVG} id={car.id} onClick={handleDelete}/></p>
									</div>
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