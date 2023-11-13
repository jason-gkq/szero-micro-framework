import 'core-js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import reportWebVitals from './reportWebVitals';

/**
 * 当前项目为子项目，非独立运行，此index无用，如local需要独立运行此项目可保留
 */
// 配置文件中定义的appName
const { appName = 'root' } = process.env.productConfig as any;

let root: any;
function render() {
  root = createRoot(document.querySelector(`#${appName}`) as Element);

  root.render(<App />);

  if ((module as any).hot) (module as any).hot.accept();
  reportWebVitals((data) => {
    sessionStorage.setItem(data.name, JSON.stringify(data));
    if (!['prod', 'pre'].includes((process as any).env.ENV)) {
      console.log(data);
    }
  });
}
render();
