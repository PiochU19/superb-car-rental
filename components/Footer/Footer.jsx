import React from 'react';

import GitHubSVG from '../../assets/svgs/github.svg';

import styles from './Footer.module.scss';


const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.footer_caption}>
				<p>Car Rental Project by Dominik Pios&copy;</p>
			</div>
			<div className={styles.footer_socials}>
				<a href='https://github.com/PiochU19' target='_blank' rel="noreferrer">
					<GitHubSVG />
				</a>
			</div>
		</div>
	)
}

export default Footer