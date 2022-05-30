const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// html-webpack-plugin config
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: true
})

// webpack config
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/i, use: ["style-loader", "css-loader"]}
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}
