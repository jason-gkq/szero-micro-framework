module.exports.defineConfig = () => ({
  appId: '100',
  appName: 'admin',
  cachePrefix: 'admin_',
  route: {
    type: 'Browser', // Browser | Hash 可以调整路由方式，如果选择hash则最好去掉appName，且调整publicUrlOrPath
    showRoutesTab: false,
    routesHistoryLength: 10,
  },
  REQUEST: {
    BASE: {
      baseURL: 'http://rap2api.taobao.org/app/mock/302222/',
      successCode: 200,
    },
  },
  layout: {
    title: '管理中台',
    index: '/index/index',
  },
  webpackConfig: {
    publicUrlOrPath: '/admin/',
    devServer: {
      port: 8000,
      host: 'localhost',
    },
    privateConfig: {},
  },
  routes: [
    {
      path: 'index',
      name: '首页',
      hideInMenu: false,
      icon: 'HomeOutlined',
      component: 'index/index',
      redirect: '/index/index',
      children: [
        {
          path: 'index',
          icon: 'HomeOutlined',
          hideInMenu: false,
          name: '首页',
        },
      ],
    },
    {
      path: 'login',
      name: '登录',
      isNoneLayout: true,
    },
  ],
});
