import React from 'react';

import Head from 'next/head';


const HeadComponent = (props) => {
	return (
		<Head>
			<meta name="description" content="Superb Car Rental" />
			<meta name="keywords" content="Car Rental, Rental, Python, Django, JS, Next, React" />
			<meta name="author" content="Dominik Pioś" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			<title>{props.children}</title>
		</Head>
	)
}

export default HeadComponent