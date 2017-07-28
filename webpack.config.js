const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: { 
        libs: [
            'angular', 'angular-animate', 'angular-aria', 'angular-material', 'angular-messages', 'angular-ui-router',
         ],
        app: "./src/app/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "output"),
        filename: "[name].js",
    },
    devtool: "source-map",
    resolve: {
        alias: [{
                name: 'fh',
                alias: path.resolve("./src/app")
            },
        ],
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=assets/[name].[ext]',
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'ngtemplate-loader',
                        options: {
                            relativeTo: path.resolve(__dirname)
                        }
                    },
                    'html-loader',
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs'
        })
    ]
}