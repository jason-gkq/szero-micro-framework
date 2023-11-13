const { ModuleFederationPlugin } = require('webpack').container;
const { routes } = require('./routes');
// 注意调整路径
const deps = require('../node_modules/@szero/pc/package.json').dependencies;

module.exports.defineConfig = () => ({
  appId: '100',
  appName: 'admin',
  cachePrefix: 'admin_',
  route: {
    type: 'Browser', // Browser | Hash 可以调整路由方式，如果选择hash则最好去掉appName，且调整publicUrlOrPath
    showRoutesTab: true,
    routesHistoryLength: 50,
  },
  layout: {
    title: '管理中台',
    index: '/index/index',
  },
  REQUEST: {
    BASE: {
      baseURL: 'http://rap2api.taobao.org/app/mock/302222/',
      successCode: 200,
    },
  },
  webpackConfig: {
    publicUrlOrPath: '/admin/',
    devServer: {
      port: 3200,
      host: 'localhost',
    },
    privateConfig: {},
    plugins: [
      new ModuleFederationPlugin({
        name: 'master',
        shared: {
          // ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
          'react-router-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-router-dom'],
          },
          mobx: {
            singleton: true,
            eager: true,
            requiredVersion: deps['mobx'],
          },
          'mobx-react-lite': {
            singleton: true,
            eager: true,
            requiredVersion: deps['mobx-react-lite'],
          },
          antd: {
            singleton: true,
            eager: true,
            requiredVersion: deps['antd'],
          },
          '@ant-design/pro-components': {
            singleton: true,
            eager: true,
            requiredVersion: deps['@ant-design/pro-components'],
          },
          '@szero/pc': {
            singleton: true,
            eager: true,
            requiredVersion: deps['@szero/pc'],
          },
        },
      }),
    ],
  },
  routes,
});
