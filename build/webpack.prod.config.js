const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: {
        a: "./src/entries/a.js",
        b: "./src/entries/b.js",
    },
    output: {
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, "../dist"),
    },
    mode: "production",
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: "common",
                    chunks: "all",
                    minChunks: 2,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../"),
        }),
        new HtmlWebpackPlugin({
            title: "a",
            filename: "a.html",
            chunks: ["common", "a"],
        }),
        new HtmlWebpackPlugin({
            title: "b",
            filename: "b.html",
            chunks: ["common", "b"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|less)$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            outputPath: "images",
                        },
                    },
                ],
            },
        ],
    },
};
