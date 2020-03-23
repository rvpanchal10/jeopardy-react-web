/* eslint-disable linebreak-style */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.js|.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css|.scss$/,
                enforce: 'pre',
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
    node: { fs: 'empty' },
    externals: [
        { './cptable': 'var cptable' },
        { './jszip': 'jszip' }
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('localhost')
        })]
};

