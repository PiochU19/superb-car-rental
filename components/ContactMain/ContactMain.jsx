import React, {useState, useEffect} from 'react';

import styles from './ContactMain.module.scss';


const ContactMain = () => {

	const [msg, setMsg] = useState('');

	const initialFormData = Object.freeze({
		email: '',
		title: '',
		message: '',
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
				.post('issue/make/', {
					email: formData.email,
					message: formData.message,
					title: formData.title,
				})
				.then(res => {
					e.target.reset();
					setMsg("Issue has been reported. We'll be in touch");
				})
				.catch(error => {
					setMsg('Something went wrong.')
				});
		});
	};

	return (
		<form className={styles.ContactMain} onSubmit={handleSubmit} spellcheck="false">
			<div className={styles.ContactMainTitle}>
				{ msg
					?
					<h1>{msg}</h1>
					:
					<h1>Fill the form below</h1>
				}
			</div>
			<div className={styles.ContactMainInputUp}>
				<div>
					<input className={styles.InputUp} type='email' id='email' placeholder='email'  onChange={handleChange}/>
				</div>
				<div>
					<input className={styles.InputUp} type='text' id='title' placeholder='title' onChange={handleChange}/>
				</div>
			</div>
			<div className={styles.ContactMainInputDown}>
				<textarea className={styles.InputDown} type='text' id='message' placeholder='explain your issue' onChange={handleChange}/>
			</div>
			<div className={styles.ContactMainButton}>
				<input className={styles.SubmitButton} type='submit' value='Sent' />
			</div>
		</form>
	)
}

export default ContactMain