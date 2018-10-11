/** 方法一
function getComponent() {
  // 通过使用动态导入来分离一个 chunk
 return import('lodash').then(_ => {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;

  }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
  document.body.appendChild(component);
})
*/

/** 方法二（简化写法）
 * 由于 import() 会返回一个 promise，
 * 因此它可以和 async 函数（https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function）一起使用。
 * 但是，需要使用像 Babel 这样的预处理器
 * 和 Syntax Dynamic Import Babel Plugin（https://babeljs.io/docs/plugins/syntax-dynamic-import/#installation）。
 * 下面是如何通过 async 函数简化代码：
 */


async function getComponent() {

   var element = document.createElement('div');
   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

   return element;
}
  
getComponent().then(component => {
   document.body.appendChild(component);
});