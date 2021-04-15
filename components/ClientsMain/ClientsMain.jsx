import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './ClientsMain.module.scss';

import BinSVG from '../../assets/svgs/bin.svg';

const isClient = () => typeof window !== "undefined";


const ClientsMain = () => {

	const [loading, setLoading] = useState(true);
	const [clients, setClients] = useState('');

	if (isClient) {
		useEffect(() => {
			loadClients();
		}, []);
	}

	const loadClients = () => {
		import ('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.get('user/clients/')
				.then(res => {
					setClients(res.data);
					setLoading(false);
				})
				.catch(error => {
					Router.push('/');
				});
		});
	};

	const handleDelete = e => {
		const id = e.target.id;

		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.delete(`user/delete/${id}/`)
				.then(res => {
					loadClients();
				})
		})
	};

	return (
		<>
			{ loading
				?
				<></>
				:
				<div className={styles.Container}>
					<div className={styles.ClientsMainTitle}>
						<h1>Manage clients</h1>
					</div>
					<div>
						{clients.map((client, index) => (
							<div key={client.id}>
								<div className={styles.ClientMain}>
									<div>
										<p>{index+1}.</p>
									</div>
									<div>
										<p>{client.first_name} {client.last_name}</p>
									</div>
									<div>
										<p>{client.email}</p>
									</div>
									<div>
										<p>{client.client.phone_number}</p>
									</div>
									<div>
										<p>{client.client.birth_day}</p>
									</div>
									<div>
										<p>{client.client.driver_license}</p>
									</div>
									<div>
										<p>{client.client.street} {client.client.street_number}</p>
									</div>
									<div>
										<p>{client.client.postal_code} {client.client.city}</p>
									</div>
									<div>
										<p><BinSVG className={styles.SVG} id={client.id} onClick={handleDelete}/></p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			}
		</>
	)
}

export default ClientsMain