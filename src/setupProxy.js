const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/blog/api',
        {
            target: 'http://127.0.0.1:30001',
            changeOrigin: true
        }
    ));
};