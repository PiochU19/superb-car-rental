import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './CarUpdate.module.scss';

const isClient = () => typeof window !== "undefined";


const CarUpdate = () => {
	
	const [loading, setLoading] = useState('');
	const [msg, setMsg] = useState('');
	const [fileMsg, setFileMsg] = useState('select car image');
	const [car, setCar] = useState('');
	const [sentData, updateFormData] = useState('');

	if (isClient) {
		useEffect(() => {
			const { slug } = Router.query;

			import('../../axios').then(axios => {
				const axiosInstance = axios.default;

				axiosInstance
					.get('user/client/')
					.then(res => {
						if (res.data.is_client) {
							Router.push('/');
						} else {
							axiosInstance
								.get(`car/get/${slug}`)
								.then(res => {
									setCar(res.data);
									setLoading(false);
									const initialFormData = Object.freeze({
										id: res.data.id,
										slug: res.data.slug,
										brand: res.data.brand,
										model: res.data.model,
										generation: res.data.generation,
										year_of_production: res.data.year_of_production,
										body_type: res.data.body_type,
										price_per_day: res.data.price_per_day,
										engine: res.data.engine,
										fuel_type: res.data.fuel_type,
										hourse_power: res.data.hourse_power,
										main_image: '',
									});
									updateFormData(initialFormData);
								})
								.catch(error => {
									Router.push('/');
								});
						};
					})
					.catch(error => {
						Router.push('/');
					});
			});
		},[]);
	};

	const handleChange = e => {
		updateFormData({
			...sentData,
			[e.target.id]: e.target.value.trim(),
		});
	};

	const handleFileChange = e => {
		updateFormData({
			...sentData,
			[e.target.id]: e.target.files[0]
		});
		setFileMsg('Image added');
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('id', sentData.id);
		formData.append('slug', sentData.slug);
		formData.append('brand', sentData.brand);
		formData.append('model', sentData.model);
		formData.append('generation', sentData.generation);
		formData.append('year_of_production', sentData.year_of_production);
		formData.append('body_type', sentData.body_type);
		formData.append('price_per_day', sentData.price_per_day);
		formData.append('engine', sentData.engine);
		formData.append('fuel_type', sentData.fuel_type);
		formData.append('hourse_power', sentData.hourse_power);
		formData.append('main_image', sentData.main_image);

		import ('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.put('car/update/', formData)
				.then(res => {
					Router.push('/panel/cars/')
				})
				.catch(error => {
					setMsg(error.response.data);
				});
		});
	};

	return (
		<>
			{ loading
				?
				<></>
				:
				<form className={styles.Container} onSubmit={handleSubmit}>
					<div className={styles.Title}>
						<h1>Edit {car.brand} {car.model}</h1>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='brand' placeholder='brand' onChange={handleChange} defaultValue={car.brand} />
						</div>
						<div>
							<input className={styles.Input} type='text' id='model' placeholder='model' onChange={handleChange} defaultValue={car.model} />
						</div>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='generation' placeholder='generation' onChange={handleChange} defaultValue={car.generation} />
						</div>
						<div>
							<input className={styles.Input} type='text' id='year_of_production' placeholder='year of prod' onChange={handleChange} defaultValue={car.year_of_production} />
						</div>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='body_type' placeholder='body type' onChange={handleChange} defaultValue={car.body_type} />
						</div>
						<div>
							<input className={styles.Input} type='text' id='price_per_day' placeholder='price' onChange={handleChange} defaultValue={car.price_per_day} />
						</div>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='engine' placeholder='engine' onChange={handleChange} defaultValue={car.engine} />
						</div>
						<div>
							<input className={styles.Input} type='text' id='fuel_type' placeholder='fuel type' onChange={handleChange} defaultValue={car.fuel_type} />
						</div>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='hourse_power' placeholder='hourse power' onChange={handleChange} defaultValue={car.hourse_power} />
						</div>
						<div className={styles.InputFile}>
							<input type='file' id='main_image' className={styles.File} onChange={handleFileChange}/>
							<label for='main_image'>{fileMsg}</label>
						</div>
					</div>
					<div className={styles.ButtonDiv}>
						<input className={styles.Button} type='submit' value='add' />
					</div>
				</form>
			}
		</>
	)
}

export default CarUpdate