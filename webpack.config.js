/* eslint-disable no-console */

require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const { PuppeteerRenderer } = PrerenderSPAPlugin;

const replacements = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  CODUS_LANDING_URL: JSON.stringify(process.env.CODUS_LANDING_URL),
  CODUS_APP_URL: JSON.stringify(process.env.CODUS_APP_URL),
  CODUS_API_BASE: JSON.stringify(process.env.CODUS_API_BASE),
};

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(__dirname, 'src'),

  module: {
    rules: [
      // SASS files
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', { loader: 'sass-loader', options: { indentedSyntax: true } }],
      },
      // CSS files
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // Vue template files
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // JavaScript files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // HTML files
      {
        test: /\.html$/,
        loaders: [
          'file-loader?name=[path][name].html&context=src',
          'extract-loader',
          {
            loader: 'string-replace-loader',
            options: {
              multiple: Object
                .entries(replacements)
                .map(([k, v]) => ({ search: k, replace: v.replace(/"/g, '\\"') })),
            },
          },
          'html-loader',
        ],
      },
      // Files that require no compilation or processing
      {
        test: /\.(ttf|woff|woff2|eot|png|svg)/,
        loader: 'url-loader',
        query: { limit: 10000, name: '[path][name].[ext]', context: 'src' },
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
  },

  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },

  plugins: [
    new webpack.DefinePlugin(replacements),
    new VueLoaderPlugin(),

    // If we're in production, minimize!
    ...process.env.NODE_ENV === 'production' ? [new webpack.LoaderOptionsPlugin({ minimize: true })] : [],

    // If we're not running webpack-dev-server, use Puppeteer to pre-render HTML
    ...(process.argv.find(v => v.includes('webpack-dev-server'))) ? [] : [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'build'),
        routes: ['/'],
        renderer: new PuppeteerRenderer({ renderAfterDocumentEvent: 'render-event' }),
      }),
    ],
  ],


  // --------------------------------------------------------------------------


  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: {
      rewrites: [{ from: /^\//, to: '/index.html' }], // SPA; routes should be rewritten
    },
    noInfo: true,
    host: process.env.HOST || process.env.IP || '0.0.0.0',
    port: process.env.PORT || 8080,
    disableHostCheck: true,
  },
};
