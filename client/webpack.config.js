const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  plugins: [new Dotenv({ systemvars: true })],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist/sub'),
    libraryTarget: 'this',
  },
  devServer: {
    open: true,
    contentBase: path.join(__dirname, 'dist/sub'),
    publicPath: '/sub/',
    historyApiFallback: true,
    watchContentBase: true,
    port: 3000,
    proxy: {
      '/graphql': {
        target: 'http://localhost:8080',
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        // for react-calendar
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: ['file-loader'],
      },
    ],
  },
};
