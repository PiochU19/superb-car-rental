import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './EmployeeMain.module.scss';

import BinSVG from '../../assets/svgs/bin.svg';


const EmployeeMain = () => {

	const [employees, setEmployees] = useState('');

	useEffect(() => {
		loadEmployees();
	}, []);

	const loadEmployees = () => {
		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.get('user/employees/')
				.then(res => {
					setEmployees(res.data);
				})
				.catch(error => {
					Router.push('/panel');
				});
		});
	};

	const handleDelete = e => {
		const id = e.target.id;
		console.log(id);

		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.delete(`user/delete/${id}`)
				.then(res => {
					loadEmployees();
				})
				.catch(error => {
					console.log(error.response);
				})
			});
	};

	return (
		<>
			{ employees
				?
				<div className={styles.Container}>
					<div className={styles.Title}>
						<h1>Manage Employees</h1>
					</div>
					<div>
						<Link href='/panel/employees/create'><input className={styles.Button} type='submit' value='add employee' /></Link>
					</div>
					{employees.map((employee, index) => (
						<div className={styles.Employee} key={employee.id}>
							<div>
								<p>{index + 1}.</p>
							</div>
							<div>
								<p>{employee.first_name} {employee.last_name}</p>
							</div>
							<div>
								<p><BinSVG className={styles.SVG} id={employee.id} onClick={handleDelete} /></p>
							</div>
						</div>
					))}
				</div>
				:
				<></>
			}
		</>
	)
}

export default EmployeeMain