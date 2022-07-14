
const path = require('path');

const webpack = require('webpack');
const buildConfig = require('./build.config.js');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = (buildConfig.dir || '/build');
const resultPath = path.resolve(__dirname, '.' + publicPath);
const fs = require('fs');

function getPage(page){

    return new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: `./src/pages/${page}.html`
    })
}

const config = {
    entry: {
        app: './src/index.js',
    },

    devtool: null,

    experiments: {
        asset: true
    },
    output: {
        filename: 'app.js',
        path: null,
        // assetModuleFilename: 'fonts/[name][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    //"style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /fonts.+\.(woff(2)?|eot|ttf|otf|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]'
                }
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext][query]'
                }
            },
            {
                test: /icons.+\.(svg)$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                    },

                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        getPage('structure'),
        getPage('accessible-environment'),
        getPage('basic-information'),
        getPage('documents'),
        getPage('economic-activity'),
        getPage('education'),
        getPage('international-cooperation'),
        getPage('management'),
        getPage('materials'),
        getPage('paid-services'),
        getPage('scholarships'),
        getPage('standards'),
        getPage('transfer-places'),


        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/images',
                    to: './images'
                }
            ],
        }),
    ],
};

module.exports = (env, argv) => {
    const dev = argv.mode === 'development';
    const prod = argv.mode === 'production';

    if (dev) config.devtool = 'source-map';
    else if (prod) config.devtool = false;

    config.output.path = prod ? resultPath : '/build';

    return config;
};