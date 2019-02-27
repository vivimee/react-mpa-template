const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const package = require("../package.json");
const config = require("./webpack.prod");

const entries = fs
    .readdirSync(path.resolve(__dirname, "../src/entries"))
    .filter((item) => !/\.config\.js$/.test(item));
const htmls = [];
const entry = config.entry;
entries.forEach((item) => {
    const name = item.replace(/\.js/, "");
    const entryPath = path.resolve(__dirname, `../src/entries/${item}`);
    entry[name] = entryPath;
    const defaultEntryConfig = {
        filename: `${name}.html`,
        favicon: "./src/images/favicon.ico",
        excludeChunks: entries
            .filter((chunk) => chunk !== item)
            .map((chunk) => chunk.replace(/\.js$/, "")),
        template: "./src/templates/default.pug",
        templateParameters: {
            $title: package.name,
            $keywords: "",
            $description: "",
        },
    };
    const entryConfigPath = entryPath.replace(/\.js$/, ".config.js");
    let entryConfig = {};
    if (fs.existsSync(entryConfigPath)) {
        entryConfig = require(entryConfigPath);
    }
    htmls.push(
        new HtmlWebpackPlugin(Object.assign(defaultEntryConfig, entryConfig)),
    );
});

config.entry = entry;
config.plugins = config.plugins.concat(htmls);

const compiler = webpack(config);
compiler.run((err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }

    console.log(
        stats.toString({
            chunks: false,
            colors: true,
            cachedAssets: false,
            modules: false,
            children: false,
            entrypoints: false,
            excludeAssets: (assetName) => /\.(map|jpeg|ico)/.test(assetName),
        }),
    );
});
