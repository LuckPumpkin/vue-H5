/*
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2021-03-02 14:35:38
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-05 11:17:54
 */

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('@babel/polyfill')

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, './src/main.js')],
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    port: 8000,
    open: true
  }
}