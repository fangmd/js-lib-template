const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, options) => {
  let plugins = [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ]
  if (options.mode === 'production') {
    plugins.splice(0, 0, new CleanWebpackPlugin())
  }
  return {
    entry: {
      bundle: path.resolve(__dirname, './src/index.ts'),
      // 'bundle.min': path.resolve(__dirname, './src/index.ts'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'myLib', // 在全局变量中增加一个library变量
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
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
