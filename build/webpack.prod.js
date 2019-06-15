const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpackConfig = require("./webpack.config");

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
        new UglifyJSPlugin({
            sourceMap: true,
        })
    ],
});
