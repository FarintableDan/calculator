const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ mode = 'development' }) => {
  const isDev = mode === 'development';
  return {
    mode,
    entry: isDev
      ? [ 'react-hot-loader/patch', 'webpack/hot/only-dev-server', path.resolve(__dirname, './src/index.jsx') ]
      : './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.woff'],
    },
    devServer: {
      hot: true,
      hotOnly: true,
      compress: true,
      port: 9000,
      contentBase: path.resolve(__dirname, './src'),
    },
    module: {
      rules: [
        {
          test: /\.[j|t]sx?$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'eslint-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
                reloadAll: true,
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
      }),
    ],
  };
};
