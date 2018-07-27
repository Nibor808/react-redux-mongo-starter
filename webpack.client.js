require('node-env-file')('./.env');
const path = require('path');
const glob = require('glob-all');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const MCSSEPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new webpack.EnvironmentPlugin('NODE_ENV'),
  new webpack.ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
  }),
  new MCSSEPlugin({
    filename: 'styles.css'
  }),
  new AssetsPlugin({
    includeManifest: 'manifest',
    prettyPrint: true,
    fullPath: false,
    path: path.resolve(__dirname, 'src')
  }),
  new MomentLocalesPlugin()
];

const rules = [
  {
    test: /\.(scss|css)$/,
    use: [
      MCSSEPlugin.loader,
      'css-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.(png|jpe?g|gif|woff|ttf|eot)/,
    loader: 'url-loader',
    options: {
      limit: 10240
    }
  },
  {
    test: /\.svg$/,
    loader: 'svg-url-loader',
    options: {
      limit: 10240,
      noquotes: true,
    }
  }
];

const DEV = process.env.NODE_ENV === 'development';
const PROD = process.env.NODE_ENV === 'production';

const baseDir = path.resolve(__dirname, './src/client');

let outputDir;
const mode = DEV ? 'development' : 'production';

if (PROD) {
  outputDir = path.resolve(__dirname, './build-prod');
} else if (DEV) {
  outputDir = path.resolve(__dirname, './dev_build');
} else {
  outputDir = path.resolve(__dirname, './build-qa');
}

const entry = `${baseDir}/client.js`;

if (!DEV) {
  plugins.push(new PurifyCSSPlugin({
    paths: glob.sync([
      path.join(__dirname, 'src/client/components/*.js'),
      path.join(__dirname, 'src/client/components/admin/*.js'),
      path.join(__dirname, 'src/client/components/auth/*.js'),
      path.join(__dirname, 'src/client/components/landing/*.js')
    ]),
    minimize: true,
    verbose: false
  }));
  rules.push(
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'image-webpack-loader',
      enforce: 'pre'
    }
  );
}

const config = {
  mode,
  entry: {
    bundle: entry
  },
  output: {
    path: outputDir,
    filename: DEV ? '[name].js' : '[name].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      Bootstrap: path.resolve('node_modules/bootstrap-sass/assets'),
      jQuery: path.resolve('node_modules/jquery/dist')
    },
    extensions: ['*', '.js', '.json', '.jsx'],
    enforceExtension: false,
    modules: [
      'node_modules'
    ]
  },
  devtool: DEV ? 'cheap-module-source-map' : false,
  plugins: plugins,
  module: {
    rules: rules,
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    occurrenceOrder: !DEV,
    concatenateModules: !DEV,
    mergeDuplicateChunks: !DEV,
    removeEmptyChunks: true,
    removeAvailableModules: true
  },
  watchOptions: {
    aggregateTimeout: 5000,
    ignored: /node_modules/,
    poll: false
  }
};

module.exports = merge(baseConfig, config);
