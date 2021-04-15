import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './IssuesMain.module.scss';

import SendSVG from '../../assets/svgs/send.svg';
import CheckSVG from '../../assets/svgs/check.svg';

const isClient = () => typeof window !== "undefined";


const IssuesMain = () => {

	const [loading, setLoading] = useState(true);
	const [issues, setIssues] = useState('');

	if (isClient) {
		useEffect(() => {
			loadIssues();
		}, [])
	};

	const loadIssues = () => {
		import('../../axios.js').then(axios => {
			const axiosInstance = axios.default;

			axiosInstance
				.get('issue/list/')
				.then(res =>{
					setIssues(res.data);
					setLoading(false);
				})
				.catch(error => {
					Router.push('/');
				});
		});
	};

	const handleDelete = e => {
		const id = e.target.id;
		console.log(id);
	};

	return (
		<>
			{ loading
				?
				<></>
				:
				<div className={styles.IssuesMain}>
					<div className={styles.IssuesTitle}>
						<h1>Manage the Issues</h1>
					</div>
					<div className={styles.Issues}>
						{issues.map((issue, index) => (
							<div className={styles.Issue} key={issue.id}>
								<div>
									<p>{index+1}.</p>
								</div>
								<div>
									<p>{issue.title}</p>
								</div>
								<div>
									{ issue.responded
										?
										<p><CheckSVG /></p>
										:
										<p><Link href={`issues/${issue.id}`}><SendSVG className={styles.SVG} id={issue.id}/></Link></p>
									}
								</div>
							</div>
						))}
					</div>
				</div>
			}
		</>
	)
}

export default IssuesMain