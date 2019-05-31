const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: [".js",".ts"]
    },
    module: {
        rules: [
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.ts?$/, loader: "ts-loader" },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        hot: true,
        inline: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './template.html',
            inject: true,
            minify: {
                removeComments: true
            }
        })
    ],
    performance: {
        hints: false
    }
};