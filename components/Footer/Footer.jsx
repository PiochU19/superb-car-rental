import React from 'react';

import FacebookSVG from '../../assets/svgs/facebook.svg';
import GitHubSVG from '../../assets/svgs/github.svg';

import styles from './Footer.module.scss';


const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.footer_caption}>
				<p>Car Rental Project by Dominik Pios&copy;</p>
			</div>
			<div className={styles.footer_socials}>
				<div className={styles.footer_socials_facebook}>
					<a href='https://www.facebook.com/dominik.pios.54/' target='_blank' rel="noreferrer">
						<FacebookSVG />
					</a>
				</div>
				<div className={styles.footer_socials_github}>
					<a href='https://github.com/PiochU19' target='_blank' rel="noreferrer">
						<GitHubSVG />
					</a>
				</div>
			</div>
		</div>
	)
}

export default Footer