const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getPort = require("get-port");
const program = require("commander");
const package = require("../package.json");
const config = require("./webpack.dev");

program
    .version("0.0.1")
    .option("-e, --entry [type]", "Specific entry")
    .parse(process.argv);

const entries = fs.readdirSync(path.resolve(__dirname, "../src/entries")).filter(item => !/\.config\.js$/.test(item));
const htmls = [];
const entry = config.entry;
entries.forEach((item) => {
    const name = item.replace(/\.js/, "");
    const entryPath = path.resolve(__dirname, `../src/entries/${item}`);
    entry[name] = entryPath;
    const defaultEntryConfig = {
        filename: `html/${name}.html`,
        favicon: "./src/images/favicon.ico",
        excludeChunks: entries.filter((chunk) => chunk !== item).map((chunk) => chunk.replace(/\.js$/, "")),
        template: "./src/templates/default.pug",
        templateParameters: {
            $title: package.name,
            $keywords: "",
            $description: "",
        },
    };
    const entryConfigPath = entryPath.replace(/\.js$/, '.config.js');
    let entryConfig = {};
    if (fs.existsSync(entryConfigPath)) {
        entryConfig = require(entryConfigPath);
    } 
    htmls.push(new HtmlWebpackPlugin(Object.assign(defaultEntryConfig, entryConfig)));
});

config.entry = entry;
config.plugins = config.plugins.concat(htmls);

const devServerOptions = {
    contentBase: "./dist",
    host: "0.0.0.0",
    hot: true,
    stats: "errors-only",
};

WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);
const compiler = webpack(config);
const devServer = new WebpackDevServer(compiler, devServerOptions);

getPort()
    .then((port) => {
        const host = "127.0.0.1";
        process.env.DEV_SERVER_ENTRY = `http://${host}:${port}/html${program.entry}`;
        // devServer.listen(port, host);
        devServer.listen(8080, host);
    })
    .catch((e) => {
        console.error("faild to get a free port");
    });
