import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './LoginMain.module.scss';


const LoginMain = () => {

	const [loading, setLoading] = useState(true);
	const [errMsg, setErrMsg] = useState("");
	const [mailMsg, setMailMsg] = useState("");

	useEffect(() => {
		if (localStorage.getItem('access_token')){
			Router.push('/');
		} else {
			setLoading(false);
		}
		if (Router.query.message) {
			setMailMsg(Router.query.message);
		}
	}, []);

	const initialFormData = Object.freeze({
		email: '',
		password: '',
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
				.post('token/', {
					email: formData.email,
					password: formData.password,
				})
				.then((res) => {
					localStorage.setItem('access_token', res.data.access);
					localStorage.setItem('refresh_token', res.data.refresh);
					axiosInstance.defaults.headers['Authorization'] = 
						'JWT '+ localStorage.getItem('access_token');
					Router.push('/');
				})
				.catch((error) => {
					setMailMsg("");
					if (error.response) {
						e.target.reset();
						formData.email = '';
						formData.password = '';
						if (error.response.data.detail) {
							setErrMsg('No active account found');
						} else {
							setErrMsg('Fill the form correctly');
						}
					} else {
						e.target.reset();
						formData.email = '';
						formData.password = '';
						setErrMsg('Something is wrong with our servers');
					}
				});
		});
	};

	return (
		<div className={styles.loginMain}>
			{ loading
				?
				<div></div>
				:
				<form className={styles.form_style} onSubmit={handleSubmit}>
					<div className={styles.login_errors}>
						{ errMsg && <h3>{errMsg}</h3> }
						{ mailMsg && <h3>{mailMsg}</h3> }
					</div>
					<div className={styles.login_title}>
						<h2>Log in</h2>
					</div>
					<div className={styles.login_form}>
						<input className={styles.login_input} type='email' id='email' placeholder='email' onChange={handleChange} />
					</div>
					<div className={styles.login_form}>
						<input className={styles.login_input} type='password' id='password' placeholder='password' onChange={handleChange} />
					</div>
					<div className={styles.login_register}>
						<p>Create an account <Link href='/signup'>here</Link></p>
						<p>Forgot password? <Link href='/passwordreset'>here</Link></p>
					</div>
					<div>
						<input className={styles.login_button} type='submit' value='login' />
					</div>
				</form>
			}
		</div>
	)
}

export default LoginMain