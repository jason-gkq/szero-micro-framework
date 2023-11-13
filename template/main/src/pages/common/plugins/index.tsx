import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  ICProps,
  createPage,
  rootStore,
  useEnv,
  history,
  IRouteMenuItem,
} from '@/zero';
import { Empty } from 'antd';
import { onMount, PluginComponent } from '@szero/plugin-remote';
import { toJS } from 'mobx';

const {
  ENV,
  appName,
  cachePrefix,
  REQUEST,
  route: configRoute,
  plugins,
} = useEnv(); //route: configRoute

export default createPage({ pageId: '1000' }, ({ route }: ICProps) => {
  const routeArr = route.split('/').filter(Boolean);
  const pluginId = routeArr[1];
  // @ts-ignore
  const [system, setSystem] = React.useState({
    ...plugins[pluginId],
  });
  useEffect(() => {
    const { user, roles, permissions, routes } = toJS(rootStore.appStore);
    const pluginRoutes = routes[0].children.find(
      (i: IRouteMenuItem) => i.path == pluginId,
    );
    /**
     * 子项目加载前，如入口有定义 onMount 方法，则会调用该方法
     * mountProps 为 onMount 调用参数，自行定义即可
     * routes 为路由参数，一般有两种处理方式
     *    1、基座项目管理全部路由，比如从接口获取，则可以通过该方法透传给子项目然后动态注入路由即可
     *    2、子项目各自管理路由，则该参数忽略即可
     * 子应用跳转：navigate.goTo('/news/user')
     */
    onMount({
      system,
      mountProps: {
        env: { ENV, appName, cachePrefix, REQUEST, configRoute },
        history,
        appStoreProps: { user, roles, permissions },
        user,
        roles,
        permissions,
        routes: pluginRoutes.children,
      },
    });
  }, [system]);

  return (
    <PageContainer pageHeaderRender={false}>
      {system ? <PluginComponent system={system} /> : <Empty />}
    </PageContainer>
  );
});
