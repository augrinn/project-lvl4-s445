const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const devmode = (NODE_ENV === 'devolopment');

module.exports = {
  mode: NODE_ENV,
  entry: [path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'main.js',
    publicPath: '/public/assets/',
  },
  watch: devmode,
  devtool: devmode ? 'inline-cheap-module-source-map' : false,
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
