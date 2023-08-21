module.exports.defineConfig = () => ({
  ENV: 'local',
  apps: [
    {
      name: 'admin',
      entry: 'http://localhost:3001/admin',
      container: '#subapp-container',
      activeRule: '/admin',
    },
  ],
});
