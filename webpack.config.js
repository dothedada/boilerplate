const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/lib/index.js',

    // devtool: 'inline-source-map',
    devServer: {
        static: './public',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
        clean: true,
        assetModuleFilename: 'assets/[name][ext]',
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'style-loader',
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff2|woff|ttf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin(), '...'],
    },
};
