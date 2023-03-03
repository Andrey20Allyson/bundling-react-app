const path = require("path");

const modeFlag = process.argv.indexOf('--mode');
const isDev = process.argv[modeFlag + 1] === 'development';

/**@type {import('webpack/types').WebpackOptionsNormalized} */
const pack_config = {
  entry: './js/index.js',
  mode: isDev? 'development': 'production',
  watch: isDev,
  devtool: isDev? 'inline-source-map': undefined,
  output: {
    path: path.join(process.cwd(), 'public'),
    filename: 'bundle.js'
  }
};

module.exports = pack_config;