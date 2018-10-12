import _ from 'lodash';
import Print from './print';

function component() {
    var element = document.createElement('div');
  
    // Lodash, 现在由此脚本导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.onclick = Print.bind(null, 'Hello webpack!');
    
    return element;
  }
  
  document.body.appendChild(component());