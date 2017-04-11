var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('autoprefixer')({
            browsers: ['last 5 versions']
          })]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}
if (process.env.NODE_ENV === 'document') {
  module.exports.entry = './example/main.js'

  module.exports.output = {
    path:path.resolve(__dirname, './demo'),
    filename:'index.js',
    libraryTarget: 'umd'
  }
  module.exports.devtool = '#source-map'
  module.exports.module.rules[0].options.loaders = {
    css: ExtractTextPlugin.extract({
      loader: 'css-loader',
      fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
    }),
    less: ExtractTextPlugin.extract({
      loader: 'css-loader!less-loader',
      fallbackLoader: 'vue-style-loader'
    })
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      title: '蓝月亮UI demo',
      template: 'example/index.html'
    }),
    new CopyWebpackPlugin([
      {from: 'example/docs',to: 'docs'}
    ])
  ])
}

if (process.env.NODE_ENV === 'production') {
  module.exports.entry = './src/index.js'

  module.exports.output = {
    path:path.resolve(__dirname, './dist'),
    filename:'index.js',
    libraryTarget: 'umd'
  }
  module.exports.devtool = '#source-map'
  module.exports.module.rules[0].options.loaders = {
    css: ExtractTextPlugin.extract({
      loader: 'css-loader',
      fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
    }),
    less: ExtractTextPlugin.extract({
      loader: 'css-loader!less-loader',
      fallbackLoader: 'vue-style-loader'
    })
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin("style.css")
  ])
}
