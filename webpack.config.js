const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
    vendor: [
      'react',
      'react-dom',
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
      }
    ]
  },
  devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, './build'),
    watchContentBase: true,
    stats: 'errors-only',
    open: true
  },
  devtool:"source-map"
};