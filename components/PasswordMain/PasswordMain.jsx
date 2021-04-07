import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import styles from './PasswordMain.module.scss';

const isClient = () => typeof window !== "undefined";


const PasswordMain = () => {

	const [token, setToken] = useState('');
	const [tok, setTok] = useState('');
	const [uidb64, setUidb64] = useState('');

	useEffect(() => {
		tokenImplement();
	}, [tok]);

	if (isClient) {
		useEffect(() => {
			const { string } = Router.query;
			setTok(string);
			window.history.pushState({}, null, '/passwordreset')
		})
	}

	const tokenImplement = () => {
		if (tok) {
			setUidb64(tok.substr(0, 2));
			setToken(tok.substr(2));
		}
	};

	return (
		<div>
			{ tok && <div><p>{tok}</p><p>{uidb64}</p><p>{token}</p></div> }
		</div>
	)
}

export default PasswordMain