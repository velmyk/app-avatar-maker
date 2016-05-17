const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack'),
	autoprefixer = require('autoprefixer')
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	rimraf = require('rimraf');

function addHash(template, hash) {
	return NODE_ENV === 'production'
		? template.replace(/\.[^.]+$/, `.[${hash}]$&`)
		: `${template}?hash=[${hash}]`;
} 

module.exports = {
	context: __dirname + '/src',
	// CommonsChunkPlugin can be used for multiple entry points
	entry: {
		app: './app/app.js'
	},
    output: {
        path: __dirname + '/target',
        pablicpath: '/',
        filename: addHash('[name].js', 'hash'),
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
		{
			apply: (compiler) => {
				rimraf.sync(compiler.options.output.path)
			}
		},
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new ExtractTextPlugin(addHash('[name].css', 'contenthash'), {
			allChanks: true,
			disable: process.env.NODE_ENV === 'development'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			chunks: ['app']
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
            },
            {
            	test: /\.scss$/,
            	loader: ExtractTextPlugin.extract('style', 'css!postcss!resolve-url!sass?sourceMap')
            },
            {
            	test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            	include: /\/node_modules\//,
            	loader: addHash('file?name=[1].[ext]&regExp=node_modules/(.*)', 'hash:6')
            },
            // {
            // 	test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            // 	loader: 'url?name=[path][name].[ext]&limit=4096'
            // },
            {
            	test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            	exclude: /\/node_modules\//,
            	loader: addHash('file?name=[path][name].[ext]', 'hash:6')
            }
		],
		noParse: /angular\/angular.js/
	},
	pstcss: () => {
		[
			autoprefixer({ browsers: ['last 2 versions'] })
		]
	},
	devServer: {
		hot: true
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