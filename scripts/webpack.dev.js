import webpack from 'webpack';
import merge from 'webpack-merge';
import ip from 'ip';
import getPort from 'get-port';
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
const ipString = ip.address();
const devServerOptions = {
    contentBase: './dist',
    publicPath: '/',
    host: ipString,
    hot: true,
    noInfo: true,
    open: true,
    openPage: 'html/index.html',
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
const bootstrap = async () => {
    const port = await getPort();
    WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);
    const compiler = webpack(webpackConfig);
    const app = new WebpackDevServer(compiler, devServerOptions);
    app.listen(port);
};

bootstrap();
