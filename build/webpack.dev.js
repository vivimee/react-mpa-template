const webpack = require("webpack");
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    output: {
        filename: "js/[name].[hash:7].js",
    },
    devtool: "inline-source-map",
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});
