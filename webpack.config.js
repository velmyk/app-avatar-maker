const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
	entry: './src/app/app.js',
    output: {
        path: './target',
        filename: 'app.js',
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
		aggregateTimeout: 100
	},
	devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},
	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js'] 
	},
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		})
	],
	module: {

		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};

if (NODE_ENV == 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	);
}