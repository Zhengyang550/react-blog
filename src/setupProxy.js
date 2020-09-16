const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/blog/api',
        {
            target: 'http://140.143.25.72:30001/',
            changeOrigin: true
        }
    ));
};