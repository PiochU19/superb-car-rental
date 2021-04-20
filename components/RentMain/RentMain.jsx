import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './RentMain.module.scss';


const RentMain = () => {

	const initialFormData = Object.freeze({
		rent_starts: '',
		rent_ends: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [loading, setLoading] = useState(true);
	const [car, setCar] = useState("");
	const [err, setErr] = useState("");
	const [additional_insurance, setAdditional_insurance] = useState(false);
	const [user_id, setUserId] = useState('');

	useEffect(() => {
		const { slug } = Router.query
		if (localStorage.getItem('refresh_token')){
			import('../../axios').then(axios =>{
				const axiosInstance = axios.default;

				axiosInstance
					.get(`car/get/${slug}`)
					.then((res) => {
						setCar(res.data);
					})
					.catch(error => {
						Router.push('/');
					});
				axiosInstance
					.get('user/id')
					.then(res => {
						setUserId(res.data.id);
					})
					.catch(error => {
						Router.push('/');
					});					
				axiosInstance
					.get('user/permissions')
					.then(res => {
						if (!res.data.is_client) {
							Router.push('/');
						} else {
							setLoading(false);
						}
					})
					.catch(error => {
						Router.push('/');
					});
			});
		} else {
			Router.push('/login');
		}
	}, []);

	useEffect(() => {
		priceCount();
	}, [additional_insurance]);

	const dateType = e => {
		e.currentTarget.type = 'date';
		handleChange(e);
	};

	const textType = e => {
		e.currentTarget.type = 'text';
		handleChange(e);
	}

	const handleChange = e => {
		updateFormData({
			...formData,
			[e.target.id]: e.target.value.trim(),
		});
		priceCount();
	};

	const checkboxChange = e => {
		setAdditional_insurance(x => !x);
	};

	const [price, setPrice] = useState("");

	const priceCount = () => {
		if (isDateValid(formData.rent_starts, formData.rent_ends)) {
			const days = dateBetween(formData.rent_starts, formData.rent_ends);
			let p = days * car.price_per_day;

			if (additional_insurance === true) {
				p = p * 1.1;
			}

			setPrice(parseInt(p));
		} else {
			setPrice('');
		}
	}

	const dateBetween = (d1, d2) => {
		d2 = parseDate(d2);
		d1 = parseDate(d1);
		return Math.round((d2-d1)/(1000*60*60*24));
	}

	const parseDate = (str) => {
		let mdy = str.split('-');
		return new Date(mdy[0], mdy[1]-1, mdy[2]);
	}

	const isDateValid = (d1, d2) => {
		d1 = parseDate(d1);
		d2 = parseDate(d2);
		const today = Date.now();

		if (d2 > d1 && d1 > today) {
			return true
		} else {
			return false
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (isDateValid(formData.rent_starts, formData.rent_ends)) {
			import('../../axios').then(axios => {
				const axiosInstance = axios.default;



				axiosInstance
					.post('rent/make/', {
						rent_starts: formData.rent_starts,
						rent_ends: formData.rent_ends,
						additional_insurance: additional_insurance,
						price: price,
						car: car.id,
						user: user_id,
					})
					.then(res =>{
						Router.push('/profile');
					})
					.catch(error => {
						if (error.response.data) {
							setErr(error.response.data);
						}
					});
			});
		} else {
			setErr("Invalid dates");
		}
	};

	return (
		<div className={styles.rent_main}>
			{ loading 
				?
				<></>
				:
				<>
					<form className={styles.form_left} onSubmit={handleSubmit}>
						<div className={styles.form_errors}>
							{ err ? <h1>{err}</h1> : <h1>Fill the form below</h1> }
						</div>
						<div className={styles.inputs}>
							<div className={styles.left_input}>
								<input className={styles.input} type='text' onFocus={dateType} onBlur={textType} id='rent_starts' placeholder='rent starts' onChange={handleChange} />
							</div>
							<div className={styles.right_input}>
								<input className={styles.input} type='text' onFocus={dateType} onBlur={textType} id='rent_ends' placeholder='rent ends' onChange={handleChange} />
							</div>
						</div>
						<div className={styles.input_insurance}>
							<div className={styles.input_insurance_left}>
								<label className={styles.switch}>
	  								<input type="checkbox" id='additional_insurance' onChange={checkboxChange} />
	  								<span className={styles.slider}></span>
								</label>
							</div>
							<div className={styles.input_insurance_right}>
								Additional insurance (10%)
							</div>
						</div>
						<div className={styles.button}>
							<div className={styles.button_left}>
								<input className={styles.button_input} type='submit' value='Rent' />
							</div>
							<div className={styles.button_right}>
								{price && <p>Price: {price} PLN</p>}
							</div>
						</div>
					</form>
					<div className={styles.details_right}>
						<div>
							<img className={styles.car_image} src={`http://34.118.16.167${car.main_image}`} alt='Samochut' />
						</div>
						<div>
							<h1>{car.brand} {car.model} {car.generation} <span className={styles.price_style}>{car.price_per_day} PLN/day</span></h1>
						</div>
						<div>
							<h2>{car.year_of_production} {car.body_type}</h2>
							<h2>{car.engine} {car.fuel_type} {car.hourse_power} hpa</h2>
						</div>
					</div>
				</>
			}
		</div>
	)
}

export default RentMain