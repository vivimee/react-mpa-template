const merge = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const WebpackVisualizerPlugin = require("webpack-visualizer-plugin");

module.exports = merge(webpackConfig, {
    devtool: "source-map",
    mode: "production",
    output: {
        filename: "js/[name].min.[hash].js",
        chunkFilename: "js/[name].min.[chunkhash].js",
    },
    optimization: {
        moduleIds: "hashed",
    },
    plugins: [
        new WebpackVisualizerPlugin()
    ],
});
