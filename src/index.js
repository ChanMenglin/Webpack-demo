import _ from 'lodash';
import printMe from './print.js';

// 任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量，所以以下检查也是有效的
if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
}
function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
  
    // Lodash, 现在由此脚本导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
  }
  
  document.body.appendChild(component());