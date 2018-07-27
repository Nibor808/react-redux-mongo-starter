const path = require('path');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');

const DEV = process.env.NODE_ENV === 'development';
const PROD = process.env.NODE_ENV === 'production';

const baseDir = path.resolve(__dirname, './src');

let outputDir;
const mode = DEV ? 'development' : 'production';

const plugins = [
  new Dotenv({
    path: './.env',
    safe: false
  })
];

if (PROD) {
  outputDir = path.resolve(__dirname, './build-prod');
} else if (DEV) {
  outputDir = path.resolve(__dirname, './dev_build');
} else {
  outputDir = path.resolve(__dirname, './build-qa');
}

const entry = `${baseDir}/index.js`;

const config = {
  mode,
  target: 'node',
  node: {
    /* fixed a problem with resolving a proper __dirname */
    __dirname: false,
    __filename: false
  },
  entry: entry,
  output: {
    filename: 'server.js',
    path: outputDir
  },
  externals: [webpackNodeExternals()],
  devtool: DEV ? 'source-map' : false,
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  plugins: plugins,
  watchOptions: {
    aggregateTimeout: 5000,
    ignored: /node_modules/,
    poll: false
  },
  optimization: {
    occurrenceOrder: !DEV,
    concatenateModules: !DEV
  },
};

module.exports = merge(baseConfig, config);
