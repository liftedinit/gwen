const webpack = require("webpack");

module.exports = function override(webpackConfig) {
  webpackConfig.resolve.fallback = {
    buffer: require.resolve("buffer"),
    crypto: require.resolve("crypto-browserify"),
    process: require.resolve("process/browser"),
    stream: require.resolve("stream-browserify"),
  };
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    })
  );
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
    resolve: {
      fullySpecified: false,
    },
  });

  return webpackConfig;
};
