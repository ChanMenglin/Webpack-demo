const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// 解决输出文件引用

module.exports = {
  entry: {// 在 entry 添加 src/print.js 作为新的入口起点（print）
    index: './src/index.js',// 生成 app.bundle.js
  },
  plugins: [
     new HtmlWebpackPlugin({
       title: 'Code Splitting'
     }),
  ],
  output: {
    filename: '[name].bundle.js',// 修改 output，以便根据入口起点名称动态生成 bundle 名称
    // 这里使用了 chunkFilename，它决定非入口 chunk 的名称。查看 output 文档(https://www.webpackjs.com/configuration/output/#output-chunkfilename)进一步了解。
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};