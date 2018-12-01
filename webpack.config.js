const path = require('path');
const webpack = require('webpack');
// entry -> output

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
       plugins: [
           new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
           new webpack.DefinePlugin({
          'process.env': { NODE_ENV: JSON.stringify('production') }
      }),
           new webpack.optimize.UglifyJsPlugin({sourceMap: true})
],
    module: {
        loaders: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
            },
            { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },
            {   test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  'url-loader?limit=10000',
                  'img-loader'
                ]},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
          ]
        },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        disableHostCheck: true
    }
};

