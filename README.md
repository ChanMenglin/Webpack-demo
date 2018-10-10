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

**使用 webpack-dev-server**  

`webpack-dev-server` 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。  
```
npm install --save-dev webpack-dev-server
```
用于启动 webpack-dev-server 的 npm script 脚本：
```
"start": "webpack-dev-server --open",
```
在命令行中运行 `npm start`，就会看到浏览器自动加载页面。如果现在修改和保存任意源文件，web 服务器就会自动重新加载编译后的代码。
webpack-dev-server 带有许多可配置的选项。转到相关[文档](https://www.webpackjs.com/configuration/dev-server)以了解更多。  
现在，服务器正在运行，你可能需要尝试[模块热替换(Hot Module Replacement)](https://www.webpackjs.com/guides/hot-module-replacement)！  

**使用 webpack-dev-middleware**  

`webpack-dev-middleware` 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 `webpack-dev-server` 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。  
首先，安装 `express` 和 `webpack-dev-middleware`：
```
npm install --save-dev express webpack-dev-middleware
```
添加 npm script 脚本，方便运行 server
```
"server": "node server.js",
```
终端执行 `npm run server`,并在浏览器访问 `http://localhost:3000` 

> 如果想要了解更多关于模块热替换(Hot Module Replacement)的机制，我们推荐你查看[模块热替换(Hot Module Replacement)指南](https://www.webpackjs.com/guides/hot-module-replacement/)。

### 3. 调整文本编辑器  

使用自动编译代码时，可能会在保存文件时遇到一些问题。某些编辑器具有“安全写入”功能，可能会影响重新编译。  
要在一些常见的编辑器中禁用此功能，请查看以下列表：
* Sublime Text 3 - 在用户首选项(user preferences)中添加 `atomic_save: "false"`。
* IntelliJ - 在首选项(preferences)中使用搜索，查找到 `"safe write"` 并且禁用它。
* Vim - 在设置(settings)中增加 `:set backupcopy=yes`。
* WebStorm - 在 `Preferences > Appearance & Behavior > System Settings` 中取消选中 `Use "safe write"`。

推荐阅读：[模块热替换(hot module replacement)](https://www.webpackjs.com/guides/hot-module-replacement)

## 8. 生产环境构建

### 1. 配置

开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

虽然，以上我们将生产环境和开发环境做了略微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 [`webpack-merge`](https://github.com/survivejs/webpack-merge) 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。

我们先从安装 `webpack-merge` 开始，并将之前指南中已经成型的那些代码再次进行分离：
```
npm install --save-dev webpack-merge
```
现在，在 `webpack.common.js` 中，我们设置了 `entry` 和 `output` 配置，并且在其中引入这两个环境公用的全部插件。在 `webpack.dev.js` 中，我们为此环境添加了推荐的 `devtool`（强大的 source map）和简单的 `devServer` 配置。最后，在 `webpack.prod.js` 中，我们引入了之前在 [tree shaking](https://www.webpackjs.com/guides/tree-shaking) 指南中介绍过的 `UglifyJSPlugin`。  

现在，我们把 scripts 重新指向到新配置。我们将 `npm start` 定义为开发环境脚本，并在其中使用 `webpack-dev-server`，将 `npm run build` 定义为生产环境脚本  

### 2. Minification

注意，虽然 [`UglifyJSPlugin`](https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin) 是代码压缩方面比较好的选择，但是还有一些其他可选择项。以下有几个同样很受欢迎的插件：
* [`BabelMinifyWebpackPlugin`](https://github.com/webpack-contrib/babel-minify-webpack-plugin)
* [`ClosureCompilerPlugin`](https://github.com/roman01la/webpack-closure-compiler)
如果决定尝试以上这些，只要确保新插件也会按照 [tree shake](https://www.webpackjs.com/guides/tree-shaking) 指南中所陈述的，具有删除未引用代码(dead code)的能力足矣。

### 3. source map

我们鼓励你在生产环境中启用 `source map`，因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助。虽然有如此强大的功能，然而还是应该针对生成环境用途，选择一个构建快速的推荐配置（具体细节请查看 [`devtool`](https://www.webpackjs.com/configuration/devtool)）。对于本指南，我们将在生产环境中使用 `source-map` 选项，而不是我们在开发环境中用到的 `inline-source-map`

> 避免在生产中使用 `inline-***` 和 `eval-***`，因为它们可以增加 bundle 大小，并降低整体性能。

### 4. 指定环境

许多 library 将通过与 `process.env.NODE_ENV` 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 `process.env.NODE_ENV === 'production'` 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 [`DefinePlugin`](https://www.webpackjs.com/plugins/define-plugin) 为所有的依赖定义这个变量  

> 技术上讲，`NODE_ENV` 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为。然而，与预期不同的是，无法在构建脚本 `webpack.config.js` 中，将 `process.env.NODE_ENV` 设置为 `"production"`，请查看 [#2537](https://github.com/webpack/webpack/issues/2537)。因此，例如 `process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'` 这样的条件语句，在 webpack 配置文件中，无法按照预期运行。

### 5. Split CSS

正如在管理资源中最后的 [加载 CSS](https://www.webpackjs.com/guides/asset-management#loading-css) 小节中所提到的，通常最好的做法是使用 `ExtractTextPlugin` 将 CSS 分离成单独的文件。在插件[文档](https://www.webpackjs.com/plugins/extract-text-webpack-plugin)中有一些很好的实现例子。`disable` 选项可以和 `--env` 标记结合使用，以允许在开发中进行内联加载，推荐用于热模块替换和构建速度。  

### 6. CLI 替代选项

以上描述也可以通过命令行实现。例如，`--optimize-minimize` 标记将在后台引用 `UglifyJSPlugin`。和以上描述的 `DefinePlugin` 实例相同，`--define` `process.env.NODE_ENV="'production'"` 也会做同样的事情。并且，`webpack -p` 将自动地调用上述这些标记，从而调用需要引入的插件。

> 参考链接  
> [webpack](https://www.webpackjs.com/) | 
[指南-起步](https://www.webpackjs.com/guides/getting-started/)  

