module.exports.defineConfig = () => ({
  ENV: 'local',
  plugins: {
    system: {
      url: 'http://localhost:3201',
      scope: `extension_system`,
      module: './index.module',
    },
  },
});
