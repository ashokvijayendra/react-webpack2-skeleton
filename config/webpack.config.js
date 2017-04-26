const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
    context: paths.context,
    entry: [paths.appIndexJs],
    output: {
        path: paths.appBuild,
        filename: 'static/js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.(css|scss)$/,
                    /\.json$/
                ],
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['react-app'] }
                }],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: ['file']
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
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        },
                        'postcss-loader']
                })
            }
        ],
    },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('postcss-import'),
                    require('postcss-mixins'),
                    require('postcss-nested'),
                    require('postcss-cssnext'),
                ],
            },
        }),        
        new ExtractTextPlugin({
            filename: 'static/css/main.css',
            allChunks: true
        }), 
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'static/js/vendor.js',
            minChunks: 2,
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     screw_ie8: true,
        //     warnings: false
        //   },
        //   mangle: {
        //     screw_ie8: true
        //   },
        //   output: {
        //     comments: false,
        //     screw_ie8: true
        //   }
        // })
    ],
    resolve: {
        modules: [
            paths.context,
            'node_modules'
        ]
    }   
};
