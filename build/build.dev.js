const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./webpack.dev.config");

const entries = fs.readdirSync(path.resolve(__dirname, "../src/entries"));
const htmls = [];
const entry = {};
entries.forEach((item) => {
    const name = item.replace(/\.js/, "");
    const entryPath = path.resolve(__dirname, `../src/entries/${item}`);
    entry[name] = entryPath;
    htmls.push(
        new HtmlWebpackPlugin({
            filename: `${name}.html`,
            chunks: ["common", name],
        }),
    );
});

config.entry = entry;
config.plugins = config.plugins.concat(htmls);

const devServerOptions = {
    contentBase: "./dist",
    host: "0.0.0.0",
    hot: true,
    stats: {
        colors: true,
    },
};

WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);
const compiler = webpack(config);
const devServer = new WebpackDevServer(compiler, devServerOptions);
devServer.listen(8080);
