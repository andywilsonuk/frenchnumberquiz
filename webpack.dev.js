const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'css-hot-loader',
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        }],
    },
    devtool: '#eval-source-map',
});
