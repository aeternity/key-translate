var path = require('path');
var webpack = require('webpack');
var LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    main: './src/main.js',
    worker: './src/utils/key-derivator-worker.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallbackLoader: "style-loader", loader: "css-loader!postcss-loader!sass-loader" }),
        include: [resolve('src/style')]
      },            
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&minetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  devServer: {
    contentBase: './src/assets',
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin(
      { minimize: true }
    ),
    new webpack.LoaderOptionsPlugin({
			options: {
				worker: {
					output: {
						filename: "hash.worker.js",
						chunkFilename: "[id].hash.worker.js"
					}
				}
			}
		}),
    new CopyWebpackPlugin([{ from: './src/assets' }])
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new FriendlyErrorsPlugin()
  ])
}

module.exports.plugins = (module.exports.plugins || []).concat([
  new HtmlWebpackPlugin({
      template: './src/assets/index.html',
      chunksSortMode: 'dependency'
  }),
  new ExtractTextPlugin({ filename: '[name]-[contenthash].css', disable: process.env.NODE_ENV !== 'production'}),
  new LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: ['last 2 version']
        })
      ]
    }
  })
]);
