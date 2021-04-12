import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './CarAdd.module.scss';

const isClient = () => typeof window !== "undefined";


const CarAdd = () => {

	const [loading, setLoading] = useState(true);
	const [msg, setMsg] = useState('');
	const [fileMsg, setFileMsg] = useState('select car image');

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
						}
					})
					.catch(error => {
						Router.push('/');
					})
			});
		},[]);
	};

	const initialFormData = Object.freeze({
		brand: '',
		model: '',
		generation: '',
		year_of_production: '',
		body_type: '',
		price_per_day: '',
		engine: '',
		fuel_type: '',
		hourse_power: '',
		main_image: '',
	});

	const [sentData, updateFormData] = useState(initialFormData);

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

		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.post('car/create/', formData)
				.then(res => {
					Router.push('/panel/cars/');
				})
				.catch(error => {
					setMsg('Fill the form correctly');
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
						<h1>Fill the form below</h1>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='brand' placeholder='brand' onChange={handleChange} />
						</div>
						<div>
							<input className={styles.Input} type='text' id='model' placeholder='model' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='generation' placeholder='generation' onChange={handleChange} />
						</div>
						<div>
							<input className={styles.Input} type='text' id='year_of_production' placeholder='year of prod' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='body_type' placeholder='body type' onChange={handleChange} />
						</div>
						<div>
							<input className={styles.Input} type='text' id='price_per_day' placeholder='price' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='engine' placeholder='engine' onChange={handleChange} />
						</div>
						<div>
							<input className={styles.Input} type='text' id='fuel_type' placeholder='fuel type' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='hourse_power' placeholder='hourse power' onChange={handleChange} />
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

export default CarAdd