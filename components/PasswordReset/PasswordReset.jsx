import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './PasswordReset.module.scss';


const PasswordReset = () => {

	const [errMsg, setErrMsg] = useState('');

	const initialFormData = Object.freeze({
		email: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = e => {
		updateFormData({
			...formData,
			[e.target.id]: e.target.value.trim(),
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		import('../../axios').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.post('passwordchange/request/', {
					email: formData.email
				})
				.then(res => {
					e.target.reset();
					setErrMsg(res.data)
				})
				.catch(error => {
					setErrMsg(error.response.data);
				});
		});
	};

	return (
		<form className={styles.passwordResetMain} onSubmit={handleSubmit}>
			<div className={styles.passwordResetTitle}>
				{ errMsg ? <h2>{errMsg}</h2> : <h2>Type your email so we can reach you there</h2> }
			</div>
			<div className={styles.passwordResetInputBlock}>
				<input className={styles.passwordResetInput} type='email' id='email' placeholder='email' onChange={handleChange} />
			</div>
			<div className={styles.passwordResetButtonBlock}>
				<input className={styles.passwordResetButton} type='submit' value='reset' />
			</div>
		</form>
	)
}

export default PasswordReset