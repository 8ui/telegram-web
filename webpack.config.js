const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'development'
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const postcssNormalize = require('postcss-normalize');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.join(__dirname, '/src/index.js'),
    babel_polyfill: '@babel/polyfill',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: NODE_ENV === 'development' ? '[name].js' : '[name][hash:6].js',
    // publicPath: path.join(__dirname, 'src/images'),
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : 'none',
  devServer: {
    contentBase: './public',
    hot: true,
  },
  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 300
  },
  // externals: {
  //   'telegram-mtproto': 'telegram-mtproto',
  //   // [
  //     // JSON.stringify(require('./public/dist/mtproto2-browser.js')),
  //     // JSON.stringify(require('./public/dist/vendor.dll.js')),
  //   // ],
  // },
  resolve: {
    extensions: ['*', '.js', '.styl'],
    alias: {
      '@atoms': path.join(__dirname, '/src/components/atoms'),
      '@molucules': path.join(__dirname, '/src/components/molucules'),
      '@organisms': path.join(__dirname, '/src/components/organisms'),
      '@dom': path.join(__dirname, '/src/core/utils/dom'),
      '@core': path.join(__dirname, '/src/core'),
      '@images': path.join(__dirname, '/src/images'),
      '@domain': path.join(__dirname, '/src/domain'),
    }
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  module: {
    rules: [
      // babel
      {
        test: /\.(js)?$/,
        loaders: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.tg(json|s)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: './stickers/[name].[ext]',
            limit: 0
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          // 'postcss-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
          { loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                './src/styles/variables.scss',
                './src/styles/color-mixins.scss',
                // './src/styles/typografy.scss',
              ]
            }
          },
        ],
      },
      {
        test: /\.(zip)$/i,
        use: 'file-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'icons/'
            }
          }
        ]
      },
      // {
		  //   test: /\.svg/,
		  //   use: {
	    //     loader: 'svg-url-loader',
	    //     options: {}
		  //   }
			// },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              // bypassOnDebug: true, // webpack@1.x
              // disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: path.join(__dirname, 'node_modules/telegram-mtproto/src'),
    //   manifest: require('./public/dist/vendor.json'),
    //   scope: 'vendor',
    //   sourceType: 'commonjs2'
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: path.join(__dirname, 'src'),
        output: {
          path: path.join(__dirname, 'public')
        },
        postcss: [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          postcssNormalize(),
        ]
      }
    }),
    new webpack.ProvidePlugin({

    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/public/index.html'),
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
