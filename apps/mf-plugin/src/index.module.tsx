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
import appStore from './app.store';
import initHttpClient from './initHttpClient';

let routes: any = [];
export const onMount = (props: any) => {
  const env = useEnv();
  if (env.REQUEST) {
    console.log('plugin is on mounted');
    return 'plugin is on mounted';
  }
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
  const { appName, tokenName, cachePrefix, route: configRoute, REQUEST } = env;
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
  initHttpClient(REQUEST);
  console.log('plugin is on mount');

  return 'plugin is init success!';
};

export default function PluginApp() {
  return (
    <Routes>
      <Route path='/'>{routes}</Route>
    </Routes>
  );
}
