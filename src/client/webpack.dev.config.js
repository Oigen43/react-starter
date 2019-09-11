const path = require('path');
const webpack = require('webpack');
const { apiUrl, webSocketUrl } = require('config');

module.exports = {
  mode: 'development',

  entry: {
    main: [
      '@babel/polyfill',
      'react-hot-loader/patch',
      './index.jsx',
    ],
  },

  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    filename: '[name].js',
  },

  context: path.resolve(__dirname, './'),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.pcss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
              localsConvention: 'camelCase',
              importLoaders: 1,
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },

  devtool: 'eval',

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.mjs', '.js', '.jsx', '.pcss'],
    alias: {
      // temp solution [issue](https://github.com/jquense/yup/issues/273)
      '@babel/runtime/helpers/builtin': path.resolve('./node_modules/@babel/runtime/helpers'),
    },
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      APP_CONFIG: {
        apiUrl: JSON.stringify(apiUrl),
        webSocketUrl: JSON.stringify(webSocketUrl),
      },
    }),
  ],
};
