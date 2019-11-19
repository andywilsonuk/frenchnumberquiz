const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const dev = require('./webpack.dev.js');

const baseMerge = merge(dev, {
    devServer: {
        open: 'Chrome',
        hot: true,
        publicPath: '/',
        contentBase: Path.join(__dirname, 'dist'),
        port: 8085,
    },
});

// css-hot-loader doesn't seem to work with the hashed filename so use a static name with devserver
module.exports = merge({
    customizeArray: merge.unique(
        'plugins',
        ['MiniCssExtractPlugin'],
        (plugin) => plugin.constructor && plugin.constructor.name,
    ),
})(
{
    plugins: [
        new MiniCssExtractPlugin({
            filename: './app.css',
        }),
    ],
}, baseMerge,
);
