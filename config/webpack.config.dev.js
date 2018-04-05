const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const port = 8080;

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          },
        ],
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'url-loader?limit=8192',
      }, {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader?javascriptEnabled=true'],
      }
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  output: {
    path: path.join(__dirname, '/build'),
    // publicPath: '/',
    filename: 'bundle.js',
  },

  devServer: {
    inline: true,
    port,
    contentBase: './build',
    hot: true,
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
    new webpack.ProvidePlugin({
      Tether: 'tether',
      Popper: ['popper.js', 'default'],
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.NamedModulesPlugin(),
  ],
};
