const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'development'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cssFilename = 'static/css/[name].[hash:8].css'

const extractTextPluginOptions = {
  filename: cssFilename,
  publicPath: Array(cssFilename.split('/').length).join('../')
}

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.join(__dirname, '/src/index.js'),
    // Set up an ES6-ish environment
    // babel_polyfill: '@babel/polyfill',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: NODE_ENV === 'development' ? '[name].js' : '[name][hash:6].js'
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : 'none',
  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 300
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       test: /\.js(\?.*)?$/i,
  //     }),
  //   ],
  //   runtimeChunk: false,
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false,
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor_app',
  //         chunks: 'all',
  //         minChunks: 2
  //       }
  //     }
  //   }
  // },
  resolve: {
    extensions: ['*', '.js', '.styl', '.pub'],
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
        test: /\.m?js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
            },
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
              ],
            },
          }, {
            loader: 'sass-loader',
            options: {
              // includePaths: [].concat(project.paths.assets()),
            },
          },
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
        test: /\.(zip|tgs)$/i,
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
      {
		    test: /\.svg/,
		    use: {
	        loader: 'svg-url-loader',
	        options: {}
		    }
			},
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
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: path.join(__dirname, 'src'),
        output: {
          path: path.join(__dirname, 'public')
        },
        postcss: [
          require('autoprefixer')({
            browsers: ['last 2 versions', 'IE > 10'],
            cascade: true,
            remove: true
          }),
          require('css-mqpacker')()
        ]
      }
    }),
    // new ExtractTextPlugin(extractTextPluginOptions),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/public/index.html'),
      filename: 'index.html',
      minify: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 3 version', 'ie >= 10']
          })
        ]
      }
    }),
    new BundleAnalyzerPlugin(),
  ]
}
