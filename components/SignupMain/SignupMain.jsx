import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './SignupMain.module.scss';


const SignupMain = () => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('refresh_token')){
			Router.push('/');
		} else {
			setLoading(false);
		}
	}, []);

	const [errMsg, setErrMsg] = useState("");

	const dateType = e => {
		e.currentTarget.type = 'date';
	};

	const textType = e => {
		e.currentTarget.type = 'text';
	}

	const initialFormData = Object.freeze({
		email: '',
    	first_name: '',
    	last_name: '',
    	password: '',
    	passwordconf: '',
    	driver_license: '',
        city: '',
        street: '',
        street_number: '',
        postal_code: '',
        phone_number: '',
        birth_day: '',
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
		if (formData.password === formData.passwordconf) {
			import('../../axios').then(axios => {
				const axiosInstance = axios.default;

				axiosInstance
					.post(`user/client/register/`, {
						email: formData.email,
		    			first_name: formData.first_name,
		    			last_name: formData.last_name,
		    			password: formData.password,
		   				client: {
		    				driver_license: formData.driver_license,
		        			city: formData.city,
		        			street: formData.street,
		        			street_number: formData.street_number,
		        			postal_code: formData.postal_code,
		        			phone_number: formData.phone_number,
		        			birth_day: formData.birth_day,
	        			},
					})
					.then((res) => {
						Router.push({ pathname: '/login', query: { message: 'Hi '+ formData.first_name +". We've sent you an email" } }, '/login')
					})
					.catch((error) => {
						if (error.response) {
							e.target.reset();
							setErrMsg("Fill the form correctly");
						} else {
							e.target.reset();
							setErrMsg('Something is wrong with our servers');
						}
					});
			});
		} else {
			setErrMsg("Password doesn't match");
		}
	};

	return (
		<div>
			{ loading
				?
				<div></div>
				:
				<form onSubmit={handleSubmit} className={styles.signupMain}>
					<div className={styles.signup_errors}>
						{ errMsg ? <h3>{errMsg}</h3> : <h3>Fill the form below</h3> }
					</div>
					<div className={styles.signup_title}>
						<h2>Signup</h2>
					</div>
					<div className={styles.signup_inputs}>
						<div className={styles.signup_input_first}>
							<input className={styles.signup_input} type='text' id='first_name' placeholder='first name' onChange={handleChange} />
						</div>
						<div className={styles.signup_input_second}>
							<input className={styles.signup_input} type='email' id='email' placeholder='email' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.signup_inputs}>
						<div className={styles.signup_input_first}>
							<input className={styles.signup_input} type='text' id='last_name' placeholder='last name' onChange={handleChange} />
						</div>
						<div className={styles.signup_input_second}>
							<input className={styles.signup_input} type='text' onFocus={dateType} onBlur={textType} id='birth_day' placeholder='birth day' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.signup_inputs}>
						<div className={styles.signup_input_first}>
							<input className={styles.signup_input} type='password' id='password' placeholder='password' onChange={handleChange} />
						</div>
						<div className={styles.signup_input_second}>
							<input className={styles.signup_input} type='text' id='phone_number' placeholder='phone number' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.signup_inputs}>
						<div className={styles.signup_input_first}>
							<input className={styles.signup_input} type='password' id='passwordconf' placeholder='password confirmation' onChange={handleChange} />
						</div>
						<div className={styles.signup_input_second}>
							<input className={styles.signup_input} type='text' id='driver_license' placeholder='driver license' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.signup_inputs}>
						<div className={styles.signup_input_first}>
							<input className={styles.signup_input} type='text' id='city' placeholder='city' onChange={handleChange} />
						</div>
						<div className={styles.signup_input_second}>
							<input className={styles.signup_input} type='text' id='postal_code' placeholder='postal code' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.signup_inputs}>
						<div className={styles.signup_input_first}>
							<input className={styles.signup_input} type='text' id='street' placeholder='street' onChange={handleChange} />
						</div>
						<div className={styles.signup_input_second}>
							<input className={styles.signup_input} type='text' id='street_number' placeholder='street number' onChange={handleChange} />
						</div>
					</div>
					<div className={styles.signup_below}>
						Already have an accout? <Link href ='/login'>Login here</Link>
					</div>
					<div className={styles.signup_button_div}>
						<input className={styles.signup_button} type='submit' value='Signup' />
					</div>
				</form>
			}
		</div>
	)
}

export default SignupMain