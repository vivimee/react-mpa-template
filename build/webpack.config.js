const path = require('path');
const chalk = require('chalk');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: {},
    output: {
        filename: 'js/[name].[chunkhash:7].js',
        path: path.resolve(__dirname, '../dist'),
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'all',
                },
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
                            '\nDev server started on:  ',
                            process.env.DEV_SERVER_ENTRY,
                        ),
                    );
                }
            },
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['pug-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/transform-runtime'],
                    },
                },
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ],
    },
};
