const { ModuleFederationPlugin } = require('webpack').container;
const { routes } = require('./routes');

module.exports.defineConfig = () => ({
  appId: '100',
  appName: 'admin',
  cachePrefix: 'admin_',
  route: {
    type: 'Browser', // Browser | Hash 可以调整路由方式，如果选择hash则最好去掉appName，且调整publicUrlOrPath
    showRoutesTab: false,
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
    publicUrlOrPath: '/plugins/mf-plugin/', // 打包
    // publicUrlOrPath: 'auto', // 开发
    devServer: {
      port: 3201,
      host: 'localhost',
    },
    optimization: {
      runtimeChunk: false,
    },
    output: {
      publicPath: 'auto', // 开发
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'extension_system',
        filename: 'remoteEntry.js',
        exposes: {
          './index.module': './src/index.module',
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
          'react-router-dom': { singleton: true, requiredVersion: false },
          mobx: {
            singleton: true,
            requiredVersion: false,
          },
          'mobx-react-lite': {
            singleton: true,
            requiredVersion: false,
          },
          antd: {
            singleton: true,
            requiredVersion: false,
          },
          '@ant-design/pro-components': {
            singleton: true,
            requiredVersion: false,
          },
          '@szero/pc': {
            singleton: true,
            requiredVersion: false,
          },
        },
      }),
    ],
  },
  routes,
});
