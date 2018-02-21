const path = require('path');

const config = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use:{
					loader: 'babel-loader',
					options:{
						presets: ['env', 'stage-3'],
						plugins: ['transform-class-properties'],
					}
				}
			}
		]
	}
};

module.exports = config;