const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
  app.use(
    "/kvapi",
    createProxyMiddleware({
      target: "http://localhost:8010",
      changeOrigin: true,
    })
  );
};
