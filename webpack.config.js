const path = require('path');
module.exports = {
    entry: './src/assets/lib/lib.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/assets/lib')
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: [
              ['es2015'],
            ],
          },
        },
      ],
    },
  };