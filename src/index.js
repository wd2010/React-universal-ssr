import './style.css';
import printMe from './print.js';

const component=()=> {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = 'btn23';
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);
  return element;
}
let element=component();
document.body.appendChild(element);


if(module.hot){
  console.log('[status]:',module.hot.status())
  module.hot.accept('./print.js',()=>{
    document.body.removeChild(element);
    element=component()
    document.body.appendChild(element)

  })

}

