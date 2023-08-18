module.exports.defineConfig = () => ({
  appId: '100',
  appName: 'main',
  layout: {
    title: 'zero 乾坤',
  },
  defaultMountApp: '/admin',
  webpackConfig: {
    publicUrlOrPath: '/',
    devServer: {
      port: 3000,
      host: 'localhost',
    },
  },
});
