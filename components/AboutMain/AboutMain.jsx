import React, {useState, useEffect} from 'react';

import Image from 'next/image';

import styles from './AboutMain.module.scss';

import GitHubSVG from '../../assets/svgs/github.svg';


const AboutMain = () => {
	return (
		<div className={styles.Container}>
			<div className={styles.Title}>
				<h1>Who am I?</h1>
			</div>
			<div className={styles.DescMyself}>
				<h3>Hi there, my name is Dominik and this is my another project written in Django and NextJS <br />Feel free to contact me if you want to login as a employee</h3>
			</div>
			<div className={styles.Title}>
				<h1>About the project</h1>
			</div>
			<div className={styles.DescProject}>
				<h3>
					This project was written in Django and NextJS, in exactly 19 days <br />
					During the writing I noticed that a lot of things should be done differently and I'm glad I was able to saw that<br />
					Honestly it was my first touch with Next, so a lot of time has been taken by reading documentation<br /><br />
					GitHub Repo below
				</h3>
			</div>
			<div>
				<a href='https://github.com/PiochU19/superb-car-rental'><GitHubSVG className={styles.SVG} /></a>
			</div>
		</div>
	)
}

export default AboutMain