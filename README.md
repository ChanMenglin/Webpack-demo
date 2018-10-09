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

## 3. 资源管理

### 1. 加载css

为了从 JavaScript 模块中 `import` 一个 CSS 文件，你需要在 [module 配置](https://www.webpackjs.com/configuration/module)中 安装并添加 [style-loader](https://www.webpackjs.com/loaders/style-loader) 和 [css-loader](https://www.webpackjs.com/loaders/css-loader)：
```
npm install --save-dev style-loader css-loader
```
可以进行 [CSS 分离](https://www.webpackjs.com/plugins/extract-text-webpack-plugin)，  
可以支持任何你可以想到的 CSS 处理器风格 - [postcss](https://www.webpackjs.com/loaders/postcss-loader), [sass](https://www.webpackjs.com/loaders/sass-loader) 和 [less](https://www.webpackjs.com/loaders/less-loader) 等。  

> webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。

### 2. 加载图片

使用 [file-loader](https://www.webpackjs.com/loaders/file-loader)，我们可以轻松地将图片混合到 CSS 中：
```
npm install --save-dev file-loader
```

合乎逻辑下一步是，压缩和优化你的图像。查看 [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) 和 [url-loader](https://www.webpackjs.com/loaders/url-loader)，以了解更多关于如果增强加载处理图片功能。

### 3. 加载字体

file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体。

### 4. 加载数据

如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 `import Data from './data.json'` 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 [csv-loader](https://github.com/theplatapi/csv-loader) 和 [xml-loader](https://github.com/gisikw/xml-loader)。
```
npm install --save-dev csv-loader xml-loader papaparse
```

## 5. 管理输出

如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的名称，会发生什么？生成的包将被重命名在一个构建中，但是我们的 `index.html` 文件仍然会引用旧的名字。我们用 [HtmlWebpackPlugin](https://www.webpackjs.com/plugins/html-webpack-plugin) 来解决这个问题。

### 设定 HtmlWebpackPlugin

```
npm install --save-dev html-webpack-plugin
```
在我们构建之前，你应该了解，虽然在 `dist/` 文件夹我们已经有 `index.html` 这个文件，然而 `HtmlWebpackPlugin` 还是会默认生成 `index.html` 文件。这就是说，它会用新生成的 `index.html` 文件，把我们的原来的替换。  
如果你在代码编辑器中将 `index.html` 打开，你就会看到 `HtmlWebpackPlugin` 创建了一个全新的文件，所有的 `bundle` 会自动添加到 `html` 中。  
如果你想要了解更多 HtmlWebpackPlugin 插件提供的全部功能和选项，那么你就应该多多熟悉 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) 仓库。  
[html-webpack-template](https://github.com/jaketrent/html-webpack-template)，除了默认模板之外，还提供了一些额外的功能。

### 清理 `/dist` 文件夹

由于过去的指南和代码示例遗留下来，导致我们的 `/dist` 文件夹相当杂乱。webpack 会生成文件，然后将这些文件放置在 `/dist` 文件夹中，但是 webpack 无法追踪到哪些文件是实际在项目中用到的。  
通常，在每次构建前清理 `/dist` 文件夹，是比较推荐的做法，因此只会生成用到的文件。让我们完成这个需求。  

[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) 是一个比较普及的管理插件。
```
npm install clean-webpack-plugin --save-dev
```
配置完成后运行 `npm run build` 旧的文件已经消失，输出目录中只会看到刚构建的文件

### Manifest

通过 manifest，webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪。如果你对通过其他方式来管理 webpack 的[输出](https://www.webpackjs.com/configuration/output)更感兴趣，那么首先了解 manifest 是个好的开始。  
通过使用 [WebpackManifestPlugin](https://github.com/danethurber/webpack-manifest-plugin)，可以直接将数据提取到一个 json 文件，以供使用。  
你可以仔细深入阅读 [manifest 的概念页面](https://www.webpackjs.com/concepts/manifest)，以及通过[缓存指南](https://www.webpackjs.com/guides/caching)来弄清如何与长期缓存相关联。  

推荐阅读：[开发指南](https://www.webpackjs.com/guides/development) | [代码分离指南](https://www.webpackjs.com/guides/code-splitting)

## 6. 开发

> 本节中的工具仅用于开发环境，请不要在生产环境中使用它们！

### 1. 使用 source map

为了更容易地追踪错误和警告，JavaScript 提供了 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 功能，将编译后的代码映射回原始源代码。如果代码中有错误 source map 就会明确的告诉你。  
source map 有很多[不同的选项](https://www.webpackjs.com/configuration/devtool)可用，请务必仔细阅读它们，以便可以根据需要进行配置。  

### 2. 选择一个开发工具

> 一些文本编辑器具有“安全写入”功能，可能会干扰以下某些工具。阅读[调整文本编辑器](https://www.webpackjs.com/guides/development/#adjusting-your-text-editor)以解决这些问题。

每次要编译代码时，手动运行 `npm run build` 就会变得很麻烦。  
webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：
* webpack's Watch Mode
* webpack-dev-server
* webpack-dev-middleware

多数场景中，你可能需要使用 `webpack-dev-server`  

**使用观察模式**  

你可以指示 webpack "watch" 依赖图中的所有文件以进行更改。如果其中一个文件被更新，代码将被重新编译，所以你不必手动运行整个构建。  

用于启动 webpack 的观察模式的 npm script 脚本：
```
"watch": "webpack --watch",
```
现在，你可以在命令行中运行 `npm run watch`，就会看到 webpack 编译代码，然而却不会退出命令行。这是因为 script 脚本还在观察文件。  
现在,修改并保存文件，检查终端窗口。应该可以看到 webpack 自动重新编译修改后的模块！  

> 参考链接  
> [webpack](https://www.webpackjs.com/) | 
[指南-起步](https://www.webpackjs.com/guides/getting-started/)  

