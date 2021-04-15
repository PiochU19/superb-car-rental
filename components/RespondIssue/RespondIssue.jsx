import React, { useEffect, useState } from 'react';

import Router from 'next/router';

import styles from './RespondIssue.module.scss';

const isClient = () => typeof window !== "undefined";


const RespondIssue = () => {

	const [loading, setLoading] = useState(true);
	const [issue, setIssue] = useState('');
	const [formData, updateFormData] = useState('');

	if (isClient) {
	useEffect(() => {
		const { id } = Router.query;
		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.get(`issue/${id}`)
				.then(res => {
					setIssue(res.data);
					setLoading(false);
					const initialFormData = Object.freeze({
						response: '',
					});
					updateFormData(initialFormData);
				})
				.catch(error => {
					Router.push('/panel/issues/');
				});
		});
	}, []);
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
				.post('issue/response/', {
					id: issue.id,
					response: formData.response,
				})
				.then(res => {
					Router.push('/panel/issues/');
				})
				.catch(error => {
					console.log(error.response);
				})
		});
	};

	return (
		<>
			{ loading
				?
				<></>
				:
				<form className={styles.RespondMain} spellCheck="false" onSubmit={handleSubmit} >
					<div className={styles.RespondTitle}>
						<h1>{issue.title}</h1>
						<h3>Issue #{issue.id}</h3>
					</div>
					<div className={styles.FlxDiv}>
						<div className={styles.FlxDivLeft}>
							<h2>Message</h2>
							<p>{issue.message}</p>
						</div>
						<div className={styles.FlxDivRight}>
							<h2>Response</h2>
							<textarea className={styles.Input} type='text' id='response' onChange={handleChange} />
							<input className={styles.Button} type='submit' value='send response' />
						</div>
					</div>
				</form>
			}
		</>
	)
}

export default RespondIssue