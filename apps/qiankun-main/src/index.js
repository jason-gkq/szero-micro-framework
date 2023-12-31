import {
  registerMicroApps,
  start,
  initGlobalState,
  setDefaultMountApp,
  runAfterFirstMounted,
} from 'qiankun';
import './index.css';
/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
// import render from "./render/ReactRender";
// import render from './render/VueRender';

// function getActiveRule(routerPrefix) {
//   return (location) => location.pathname.startsWith(`${routerPrefix}`);
// }

/**
 * Step1 初始化应用（可选）
 */
// render({ loading: true });

// const loader = (loading) => render({ loading });
const { apps = [], defaultMountApp, ENV } = process.env.productConfig;

console.log(ENV, 'registerApps:>', apps);

registerMicroApps(apps, {
  beforeLoad: [
    async (app) => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
    },
  ],
  beforeMount: [
    async (app) => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
  ],
  afterUnmount: [
    async (app) => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    },
  ],
});

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) =>
  console.log('[onGlobalStateChange - master]:', value, prev),
);

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp(defaultMountApp || '/admin');

start();

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
