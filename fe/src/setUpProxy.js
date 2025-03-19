const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  console.log("Proxy setup is active!");
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};