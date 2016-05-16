const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
	context: __dirname + '/src',
	// CommonsChunkPlugin can be used for multiple entry points
	entry: {
		app: './app/app.js'
	},
    output: {
        path: __dirname + '/target',
        pablicpath: '/',
        filename: '[name].js',
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
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		})
	],
	module: {
		loaders: [
			{
                test: /\.js$/,
                loader: 'ng-annotate'
            },
			{
				test: /\.js$/,
				include: __dirname + '/src',
				loader: 'babel',
				query: {
					presets: ['es2015', 'stage-0']
				}
			},
            {
                test: /\.html$/,
                loader: 'raw'
            }
		],
		noParse: /angular\/angular.js/
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