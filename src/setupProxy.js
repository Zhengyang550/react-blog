const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/blog/api',
        {
            target: 'http://81.68.217.175:30001/',
            changeOrigin: true
        }
    ));
};