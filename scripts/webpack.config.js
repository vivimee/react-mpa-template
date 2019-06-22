import fs from 'fs';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackProgressPlugin from 'progress-bar-webpack-plugin';

const PROJECT_ROOT = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(PROJECT_ROOT, 'src');
const DIST_PATH = path.resolve(PROJECT_ROOT, 'dist');
const ENTRYS_PATH = path.resolve(SRC_PATH, 'entries');
const TEMPLATE_PATH = path.resolve(SRC_PATH, 'templates', 'index.html');

const entryConfig = {};
const htmlPlugins = [];

const entries = fs.readdirSync(ENTRYS_PATH).map((filename) => ({
    name: filename.replace(/\.js$/, ''),
    path: path.resolve(ENTRYS_PATH, filename),
}));
const chunks = entries.map((entry) => entry.name);

entries.forEach((entry) => {
    entryConfig[entry.name] = entry.path;
    htmlPlugins.push(
        new HtmlWebpackPlugin({
            filename: `html/${entry.name}.html`,
            template: TEMPLATE_PATH,
            excludeChunks: chunks.filter((chunk) => chunk !== entry.name),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
    );
});

export default {
    entry: entryConfig,
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        path: DIST_PATH,
        publicPath: '../',
    },
    devtool: 'source-map',
    resolve: {
        alias: {},
    },
    plugins: [new WebpackProgressPlugin(), ...htmlPlugins],
    optimization: {
        runtimeChunk: {
            name: 'runtime',
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
                default: {},
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                    },
                    'less-loader',
                ],
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
