const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, options) => {
  let plugins = [
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',
    // }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ]

  if (options.mode === 'production') {
    plugins.splice(1, 0, new CleanWebpackPlugin())
  }

  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      // alias: {
      //   process: 'process/browser',
      // },
    },
    entry: {
      myLib: path.resolve(__dirname, './src/index.ts'),
    },
    devtool: 'source-map',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'myLib', // 在全局变量中增加一个library变量
      libraryTarget: 'umd',
      libraryExport: 'default',
      globalObject: 'this',
    },
    // devServer: {
    //   injectClient: false,
    // },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(ts|js)x?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader?cacheDirectory=true',
              },
            },
          ],
        },
      ],
    },
    plugins: plugins,
  }
}
