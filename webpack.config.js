const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './start.js',
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'redux-logger',
      'redux-thunk',
      'react-bootstrap'
    ]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015', 'react'] }
          },
          {
            loader: "source-map-loader",
            options : { enforce: "pre" }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),
    new webpack.optimize.CommonsChunkPlugin('vendor'),
  ],
  devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, './build'),
    watchContentBase: true,
    stats: 'errors-only',
    open: true
  },
  devtool:"source-map"
};