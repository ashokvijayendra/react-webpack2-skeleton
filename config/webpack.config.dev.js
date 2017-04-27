const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: paths.context,
    entry: [
            'react-hot-loader/patch', 
            'webpack-dev-server/client?http://0.0.0.0:3000', 
            'webpack/hot/only-dev-server', 
            paths.appIndexJs
    ],
    output: {
        path: paths.appBuild,
        filename: 'static/js/[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: [{
                   loader: 'file-loader',
                   options: {
                     name: 'static/images/[name].[ext]'
                   } 
                }]               
            }, 
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // same configuration with react-app preset,
                            // except the babel-plugin-syntax-dynamic-import, which collides with react-hot-loader
                            // (it is not necessary in webpack2)
                            presets: [
                                ["latest", {
                                    "es2015": {
                                        "modules": false
                                    }
                                }],
                                "react"
                            ],
                            plugins: [
                                // class { handleClick = () => { } }
                                'transform-class-properties',
                                // { ...todo, completed: true }
                                ['transform-object-rest-spread', { useBuiltIns: true }],
                                // Polyfills the runtime needed for async/await and generatorss
                                ['transform-runtime', {
                                    helpers: false,
                                    polyfill: false,
                                    regenerator: true,
                                    moduleName: path.dirname(require.resolve('babel-runtime/package'))
                                }],
                                ['transform-regenerator', {
                                    // Async functions are converted to generators by babel-preset-latest
                                    async: false
                                }]
                            ]
                        }
                    }
                ],
            },         
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[name]__[local]'
                            }
                        },
                        'postcss-loader']
                })
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('postcss-import')({
                        path: process.cwd(),
                        addDependencyTo: webpack
                    }),
                    require('postcss-mixins'),
                    require('postcss-nested'),
                    require('postcss-cssnext'),
                ],
            },
        }),         
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('static/css/main.css'),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml
        })
    ],
    resolve: {
        modules: [
            paths.context,
            'node_modules'
        ]
    },
    devServer: {
        contentBase: paths.context,
        port: 3000,
        hot: true,
        inline: false,
        historyApiFallback: true
    } 
};