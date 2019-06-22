const path = require("path");
const chalk = require("chalk");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const compressAssetsString = (text) => {
    return text.replace(/\n/g, " ").replace(/\s+/g, " ");
};

module.exports = {
    entry: {},
    output: {
        filename: "js/[name].[hash].js",
        chunkFilename: "js/[name].[chunkhash].js",
        path: path.resolve(__dirname, "../dist"),
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            maxInitialRequests: 5,
            cacheGroups: {
                vendors: {
                    test: /node_modules\/(core-js|react|react-dom|react-router|react-router-dom)\//,
                    name: 'dll',
                    chunks: 'all',
                    priority: 20,
                },
                default: {}
            },
        },
    },
    plugins: [
        new ProgressBarPlugin({
            clear: false,
            callback: () => {
                if (process.env.DEV_SERVER_ENTRY) {
                    console.log(
                        chalk.greenBright.bold(
                            "\nDev server started on:  ",
                            process.env.DEV_SERVER_ENTRY,
                        ),
                    );
                }
            },
        }),
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../"),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "pug-loader",
                        options: {
                            filters: {
                                "compress-assets": compressAssetsString,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            "@babel/transform-runtime",
                            "@babel/proposal-class-properties",
                        ],
                    },
                },
            },
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                    },
                    "less-loader",
                ],
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
