const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');// 解决输出文件引用
const CleanWebpackPlugin = require('clean-webpack-plugin');// 清理输出文件夹

module.exports = {
  entry: './src/index.js',
  plugins: [
     new CleanWebpackPlugin(['dist']),// 构建前清理输出文件夹
     new HtmlWebpackPlugin({
       title: 'Caching'
     }),
     new webpack.HashedModuleIdsPlugin()
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all'
         }
       }
     }
  }
};