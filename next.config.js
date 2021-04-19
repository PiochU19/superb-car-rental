module.exports = {
	webpack(config) {
		config.module.rules.push({
      		test: /\.svg$/,
      		use: ["@svgr/webpack"]
    	});
    	config.watchOptions = {
      		poll: 1000,
      		aggregateTimeout: 300,
    	}

    	return config;
  	},
};