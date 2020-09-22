const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api/blog',
        {
            // target: 'http://81.68.217.175:30001/',
            target: 'http://127.0.0.1:30001/',
            changeOrigin: true
        }
    ));
};