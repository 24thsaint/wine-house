const path = require('path');

module.exports = {
  entry: './app/client/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public/js'), 
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '/fonts/[name].[ext]',
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules(\/|\\)(?!(@feathersjs))/,
        loader: 'babel-loader'
      }
    ]
  }
};