import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { runInAction } from 'mobx';
import {
  useEnv,
  rootStore,
  pageStore,
  initNavigate,
  useToken,
  setCacheEnvironment,
  getRouters,
} from '@/zero';
// import User from '@/src/pages/news/user';
// import Roles from '@/src/pages/news/roles';
import appStore from './app.store';

let routes: any = [];
export const onMount = (props: any) => {
  /**
   * 子项目store初始化
   */
  runInAction(() => {
    rootStore.appStore = appStore;
    rootStore.pageStore = pageStore;
  });
  /**
   * 基站项目中环境变量注入子项目
   */
  const env = useEnv();
  env.setEnv(props.env);
  /**
   * 基站项目中用户信息注入子项目
   */
  if (props && props.appStoreProps) {
    runInAction(() => {
      for (const [key, value] of Object.entries(props.appStoreProps)) {
        rootStore.appStore[key] = value;
      }
    });
  }
  const { appName, tokenName, cachePrefix, route: configRoute } = env;
  /**
   * 初始化路由信息，注入基站项目路由实例
   */
  initNavigate({
    routeType: configRoute?.type,
    rootRoute: appName,
    history: props.history,
  });
  /**
   * 初始化token变量前缀，使其和基站保持一致
   */
  const { setTokenName } = useToken();
  if (tokenName) {
    setTokenName(tokenName);
  } else {
    setTokenName(appName ? `${appName}-token` : 'token');
  }
  /**
   * 初始化缓存变量前缀，使其和基站保持一致
   */
  setCacheEnvironment({
    prefix: cachePrefix,
  });
  /**
   * 根据配置菜单初始化子项目路由信息
   */
  routes = getRouters(props.routes, false, 'news');
  // HttpClient 子项目请求初始化，每个子项目做一遍
  return 'plugin is init success!';
};

export default function PluginApp() {
  // console.log('plugin-init');

  // HttpClient.get('system/user/list', { params: {} }).then((res: any) => {
  //   console.log('>>>>?', res);
  // });

  return (
    <Routes>
      <Route path='/'>
        {routes}
        {/* {t && <Route index path='user' element={<User />} />} */}
        {/* <Route index path='user' element={<User />} />
        <Route path='roles' element={<Roles />} /> */}
      </Route>
    </Routes>
  );
}
