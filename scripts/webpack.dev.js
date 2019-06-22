import webpack from 'webpack';
import merge from 'webpack-merge';
import WebpackDevServer from 'webpack-dev-server';
import webpackBaseConfig from './webpack.config';

const devConfig = {
    mode: 'development',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
};
const webpackConfig = merge(webpackBaseConfig, devConfig);
const devServerOptions = {
    contentBase: './dist',
    publicPath: '/',
    host: '0.0.0.0',
    hot: true,
    stats: {
        chunks: false,
        assets: false,
        colors: true,
        cachedAssets: false,
        modules: false,
        children: false,
        entrypoints: false,
    },
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);
const compiler = webpack(webpackConfig);
const app = new WebpackDevServer(compiler, devServerOptions);

app.listen(8080, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('server started');
});
