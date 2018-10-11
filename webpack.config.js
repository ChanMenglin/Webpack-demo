const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// 解决输出文件引用

module.exports = {
  entry: {// 在 entry 添加 src/print.js 作为新的入口起点（print）
     app: './src/index.js',// 生成 app.bundle.js
     another: './src/another-module.js'
  },
  plugins: [
     new HtmlWebpackPlugin({
       title: 'Code Splitting'
     }),
     
  ],
  // CommonsChunkPlugin 的使用，中文翻译未更新，会导致报错，请参考英文文档使用
  optimization: {
     splitChunks: {
       chunks: 'all'
     }
  },
  output: {
    filename: '[name].bundle.js',// 修改 output，以便根据入口起点名称动态生成 bundle 名称
    path: path.resolve(__dirname, 'dist')
  }
};