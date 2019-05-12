const path = require('path');

const mode = process.env.NODE_ENV === 'test' ? 'development' : process.env.NODE_ENV || 'development';

module.exports = {
  mode: mode,
  entry: [path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'main.js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|coverage)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'), // eslint-disable-line global-require
              ],
            },
          },
        ],
      },
    ],
  },
};
