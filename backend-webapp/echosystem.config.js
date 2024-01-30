module.exports = {
  apps: [
    {
      name: 'backend-webapp',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
