const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
     rules: [
       {
         test: /\.css$/,// 以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.(png|svg|jpg|gif)$/,// 加载图片
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,// 加载字体
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.(csv|tsv)$/,// 加载数据
         use: [
           'csv-loader'
         ]
       },
       {
         test: /\.xml$/,// 加载数据
         use: [
           'xml-loader'
         ]
       }
     ]
   }
};