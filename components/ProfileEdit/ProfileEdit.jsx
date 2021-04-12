import React, {useState, useEffect} from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './ProfileEdit.module.scss';

const isClient = () => typeof window !== "undefined";


const ProfileEdit = () => {

	const [loading, setLoading] = useState(true);
	const [client, setClient] = useState('');
	const [formData, updateFormData] = useState('');
	const [msg, setMsg] = useState('');

	if (isClient) {
		useEffect(() => {
			import('../../axios.js').then(axios => {
				const axiosInstance = axios.default;

				axiosInstance
					.get('user/client/update')
					.then(res => {
						setLoading(false);
						setClient(res.data);

						const initialFormData = Object.freeze({
							user: res.data.user,
							phone_number: res.data.phone_number,
							birth_day: res.data.birth_day,
							city: res.data.city,
							street: res.data.street,
							street_number: res.data.street_number,
							postal_code: res.data.postal_code,
						});

						updateFormData(initialFormData);
					})
					.catch(error => {
						Router.push('/');
					})
			});
		}, []);
	};

	const dateType = e => {
		e.currentTarget.type = 'date';
	};

	const textType = e => {
		e.currentTarget.type = 'text';
	}

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
				.put('user/client/update/', {
					user: formData.user,
					phone_number: formData.phone_number,
					birth_day: formData.birth_day,
					city: formData.city,
					street: formData.street,
					street_number: formData.street_number,
					postal_code: formData.postal_code,
				})
				.then(res => {
					Router.push('/profile');
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
				<form className={styles.ProfileEdit} onSubmit={handleSubmit}>
					<div className={styles.ProfileEditTitle}>
						{msg ? <h1>{msg}</h1> : <h1>Edit your profile</h1> }
					</div>
					<div className={styles.ProfileEditInputs}>
						<div>
							<input className={styles.ProfileEditInput} type='text' id='phone_number' placeholder='phone number' defaultValue={client.phone_number} onChange={handleChange}/>
						</div>
						<div>
							<input className={styles.ProfileEditInput} type='text' id='birth_day' placeholder='birth day' onFocus={dateType} onBlur={textType} defaultValue={client.birth_day} onChange={handleChange}/>
						</div>
					</div>
					<div className={styles.ProfileEditInputs}>
						<div>
							<input className={styles.ProfileEditInput} type='text' id='postal_code' placeholder='postal_code' defaultValue={client.postal_code} onChange={handleChange}/>
						</div>
						<div>
							<input className={styles.ProfileEditInput} type='text' id='city' placeholder='city' defaultValue={client.city} onChange={handleChange}/>
						</div>
					</div>
					<div className={styles.ProfileEditInputs}>
						<div>
							<input className={styles.ProfileEditInput} type='text' id='street' placeholder='street' defaultValue={client.street} onChange={handleChange}/>
						</div>
						<div>
							<input className={styles.ProfileEditInput} type='text' id='street_number' placeholder='street_number' defaultValue={client.street_number} onChange={handleChange}/>
						</div>
					</div>
					<div className={styles.EditButtonDiv}>
						<input className={styles.EditButton} type='submit' value='edit' />
					</div>
				</form>
			}
		</>
	)
}

export default ProfileEdit