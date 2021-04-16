import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './EmployeeCreate.module.scss';

import BinSVG from '../../assets/svgs/bin.svg';


const EmployeeCreate = () => {

	const initialFormData = Object.freeze({
		email: '',
    	first_name: '',
    	last_name: '',
    	password: ''
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [loading, setLoading] = useState(true);
	const [msg, setMsg] = useState('');

	useEffect(() => {
		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.get('user/permissions/')
				.then(res => {
					if (res.data.is_superuser) {
						setLoading(false);
					} else {
						Router.push('/panel');
					}
				})
				.catch(error => {
					Router.push('/panel');
				});
		});
	}, []);

	const handleChange = e => {
		updateFormData({
			...formData,
			[e.target.id]: e.target.value.trim(),
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;
		
			axiosInstance
				.post('user/employee/register/', {
					email: formData.email,
					password: formData.password,
					first_name: formData.first_name,
					last_name: formData.last_name,
				})
				.then(res => {
					Router.push('/panel/employees');
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
				<form onSubmit={handleSubmit} className={styles.Container}>
					<div className={styles.Title}>
						{msg ? <h1>{msg}</h1> : <h1>Add a new Employee</h1> }
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='text' id='first_name' placeholder='first name' onChange={handleChange} />
						</div>
						<div>
							<input className={styles.Input} type='text' id='last_name' placeholder='last name' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.Inputs}>
						<div>
							<input className={styles.Input} type='email' id='email' placeholder='email' onChange={handleChange} />
						</div>
						<div>
							<input className={styles.Input} type='password' id='password' placeholder='password' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.ButtonDiv}>
						<input className={styles.Button} type='submit' value='create employee' />
					</div>
				</form>
			}
		</>
	)
}

export default EmployeeCreate