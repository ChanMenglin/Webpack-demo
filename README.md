# Webpack

> webpack-demo 主要演示 Webpack 的基础构建方法，最终会生成一个基础的开发框架，本 demo 是根据 Webpack 中文网的 [指南](https://www.webpackjs.com/guides/installation/) 构建的，并且会将指南中的每一小节的内容作为一个单独的 commit 便于查看。  

## 1. 安装

安装之前你需要先安装 [Node.js](https://nodejs.org/zh-cn/) 最新的长期支持的版本。  
### 1. 本地安装

> 中国大陆的朋友请不要使用 `cnpm`,会有很多奇怪的问题。  
> 安装前请先初始化你的项目

```
npm install --save-dev webpack # 安装最新版
npm install --save-dev webpack@<version> # 安装特定版本 （<version> 为版本号）
```
webpack 4+ 版本，还需要安装 CLI。
```
npm install --save-dev webpack-cli
```

### 2. 全局安装（不推荐）

> 全局安装的方式不便于项目的维护与升级，不推荐进行全局安装

```
npm install --global webpack
```

### 3. 最新体验版本

> 最新版本可能存在 bug，请勿用于生产环境

```
npm install webpack@beta
npm install webpack/webpack#<tagname/branchname>
```

## 2. 起步

```
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```
创建相关文件
在 `index.js` 中打包 `lodash` 依赖
```
npm install --save lodash
```
> 在安装一个要打包到生产环境的安装包时，你应该使用 `npm install --save`，如果你在安装一个用于开发环境的安装包（例如，linter, 测试库等），你应该使用 `npm install --save-dev`。请在 [npm 文档](https://docs.npmjs.com/cli/install) 中查找更多信息。

尝试打包并在浏览器中打开 index.html 
```
npx webpack
```
打包时会有警告，这个不会影响打包，此问题后续会解决

使用配置文件打包
```
npx webpack --config webpack.config.js
```
如果 `webpack.config.js` 存在，则 `webpack` 命令将默认选择使用它。我们在这里使用 `--config` 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。  

我们可以通过配置方式指定 loader 规则(loader rules)、插件(plugins)、解析选项(resolve options)，以及许多其他增强功能。了解更多详细信息，请查看[配置文档](https://www.webpackjs.com/configuration)。  

如果你配置了 [npm 脚本(npm script)](https://docs.npmjs.com/misc/scripts) `"build": "webpack"` 也可以运行 `npm run build` 打包  

## 3-2. tree shaking

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的[静态结构特性](http://exploringjs.com/es6/ch_modules.html#static-module-structure)，例如 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)。这个术语和概念实际上是兴起于 ES2015 模块打包工具 [rollup](https://github.com/rollup/rollup)。  

新的 webpack 4 正式版本，扩展了这个检测能力，通过 package.json 的 `"sideEffects"` 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

### 1. 将文件标记为无副作用(side-effect-free)

在一个纯粹的 ESM 模块世界中，识别出哪些文件有副作用很简单。然而，我们的项目无法达到这种纯度，所以，此时有必要向 webpack 的 compiler 提供提示哪些代码是“纯粹部分”。  
这种方式是通过 package.json 的 `"sideEffects"` 属性来实现的。  
```json
{
  "name": "webpack-demo",
  "sideEffects": false
}
```
如同上面提到的，如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export 导出。  
如果你的代码确实有一些副作用，那么可以改为提供一个数组：

> 「副作用」的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。
```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
  ]
}
```
数组方式支持相关文件的相对路径、绝对路径和 glob 模式。它在内部使用 [micromatch](https://github.com/micromatch/micromatch#matching-features)。  

> 注意，任何导入的文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 `css-loader` 并导入 CSS 文件，则需要将其添加到 `side effect` 列表中，以免在生产模式中无意中将它删除
```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```
还可以在 [`module.rules 配置选项`](https://github.com/webpack/webpack/issues/6065#issuecomment-351060570) 中设置 `"sideEffects"`。

### 2. 压缩输出

我们已经可以通过 `import` 和 `export` 语法，找出那些需要删除的“未使用代码(dead code)”，然而，我们不只是要找出，还需要在 bundle 中删除它们。为此，我们将使用 `-p(production)` 这个 webpack 编译标记，来启用 `uglifyjs` 压缩插件。  
> 注意，`--optimize-minimize` 标记也会在 webpack 内部调用 `UglifyJsPlugin`。  
从 webpack 4 开始，也可以通过 `"mode"` 配置选项轻松切换到压缩输出，只需设置为 `"production"`。
> 注意，也可以在命令行接口中使用 `--optimize-minimize` 标记，来使用 `UglifyJSPlugin`。


> 参考链接  
> [webpack](https://www.webpackjs.com/) | 
[指南-起步](https://www.webpackjs.com/guides/getting-started/)  

