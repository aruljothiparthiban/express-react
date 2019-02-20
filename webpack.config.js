const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const client = {
    entry : ['@babel/polyfill', './src/client/index.js'],
    output : {
        path : path.join(__dirname, 'dist/public'),
        filename : 'client_bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader'
                }
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './src/client/index.html',
            filename : 'client.html'
        }),
        new CopyWebpackPlugin([
            {
                from : path.join(__dirname, 'src/client/assets'),
                to : path.join(__dirname, 'dist/public/assets')
            },
            {
                from : path.join(__dirname, 'src/data'),
                to : path.join(__dirname, 'dist/public/data')
            }
        ])
    ]
};

const server = {
    entry: ['@babel/polyfill', './src/server/index.js'],
    context: __dirname,
    target: 'node',
    node: {
        console: false,
        global: true,
        process: true,
        __filename: true,
        __dirname: true,
        Buffer: true,
        setImmediate: true
    },
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};

module.exports = [ client, server ];