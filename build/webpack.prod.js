const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const Visualizer = require('webpack-visualizer-plugin');
const webpackConfig = require("./webpack.config");

module.exports = merge(webpackConfig, {
    devtool: "source-map",
    mode: "production",
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
        }),
        new Visualizer(),
    ],
});
