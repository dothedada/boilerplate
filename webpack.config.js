const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env) => {
    const [mode, modeConf] =
        env.mode === 'development'
            ? ['development', true]
            : ['production', false];

    return {
        mode,
        entry: './src/lib/index.js',

        devtool: modeConf ? 'inline-source-map' : false,
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
            clean: !modeConf,
            assetModuleFilename: 'assets/[name][ext]',
        },

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        modeConf ? 'style-loader' : MiniCssExtractPlugin.loader,
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
};
