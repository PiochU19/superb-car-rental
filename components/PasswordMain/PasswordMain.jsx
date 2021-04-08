import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './PasswordMain.module.scss';

const isClient = () => typeof window !== "undefined";


const PasswordMain = () => {

	const [errMsg, setErrMsg] = useState('');
	const [token, setToken] = useState('');
	const [tok, setTok] = useState('');
	const [uidb64, setUidb64] = useState('');
	const [loading, setLoading] = useState(true);

	const initialFormData = Object.freeze({
		password: '',
		password_conf: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	useEffect(() => {
		tokenImplement();
	}, [tok]);

	if (isClient) {
		useEffect(() => {
			const { string } = Router.query;
			setTok(string);
			window.history.pushState({}, null, '/passwordreset')
		});
	};

	const tokenImplement = () => {
		if (tok) {
			if (tok.length === 41){
				setUidb64(tok.substr(0, 2));
				setToken(tok.substr(2));
				setLoading(false);
			} else {
				Router.push('/');
			}
		}
	};

	const handleChange = e => {
		updateFormData({
			...formData,
			[e.target.id]: e.target.value.trim(),
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (formData.password === formData.password_conf) {
			import('../../axios').then(axios => {
				const axiosInstance = axios.default;

				axiosInstance
					.post('passwordchange/', {
						uidb64: uidb64,
						token: token,
						password: formData.password
					})
					.then(res => {
						Router.push({ pathname: '/login', query: { message: res.data } }, '/login')
					})
					.catch(error => {
						if (error.response.data) {
							setErrMsg(error.response.data);
						}
					});
			});
		} else {
			setErrMsg("Password doesn't match");
		}
	};

	return (
		<>
			{loading
			?
			<div></div>
			:
			<form className={styles.passwordMain} onSubmit={handleSubmit}>
				<div className={styles.passwordMainTitle}>
					{ errMsg ? <h2>{errMsg}</h2> : <h2>Fill the form below</h2> }
				</div>
				<div className={styles.passwordMainInputBlock}>
					<input className={styles.passwordMainInput} type='password' id='password' placeholder='new password' onChange={handleChange} />
				</div>
				<div className={styles.passwordMainInputBlock}>
					<input className={styles.passwordMainInput} type='password' id='password_conf' placeholder='password confirmation' onChange={handleChange} />
				</div>
				<div className={styles.passwordMainButtonBlock}>
					<input className={styles.passwordMainButton} type='submit' value='reset' />
				</div>
			</form>
			}
		</>
	)
}

export default PasswordMain