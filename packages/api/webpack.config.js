const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const package = require('./package');
// const execSync = require('child_process').execSync;

const env = process.env;
const NODE_ENV = env.NODE_ENV || 'development';
const isSentryRelease = !!(env.SENTRY_AUTH_TOKEN && env.SENTRY_PROJECT && env.SENTRY_ORG);
const release = `${env.SENTRY_PROJECT}@${package.version}`;

const isDocker = process.argv.includes('--docker');

let gitExits = false;
// Disable setCommits
// if (isSentryRelease) {
//   try {
//     console.log('Checking Git');
//     gitExits = !!execSync('which git').toString().trim();
//   } catch {
//     console.log('Git Not Exits Skip setCommits on Sentry');
//     gitExits = false;
//   }
// }

// const PREV_VERSION = gitExits
//   ? execSync(`git describe --abbrev=0 --tags versions/${package.version}^`).toString().trim()
//   : 'auto';
// const CURRENT_COMMIT = gitExits ? execSync(`git rev-parse HEAD`).toString().trim() : 'auto';
// const PREV_COMMIT = gitExits ? execSync(`git rev-list -n 1 ${PREV_VERSION}`).toString().trim() : 'auto';

const devtool = {
  development: 'inline-source-map',
  production: 'source-map',
};

const plugins = {
  development: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: `require('source-map-support').install();`,
      raw: true,
      entryOnly: true,
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  production: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: `global.newrelic = require('newrelic');\n`,
      raw: true,
      entryOnly: true,
    }),
    new ForkTsCheckerWebpackPlugin({ async: false, useTypescriptIncrementalApi: true }),
    isSentryRelease &&
      new SentryWebpackPlugin({
        include: './build/',
        urlPrefix: '/usr/src/app', // Check in Dockerfile
        configFile: 'sentry.properties',
        ignore: ['node_modules', 'webpack.config.js'],
        release,
        ...(gitExits
          ? {
              setCommits: {
                repo: 'https://bitbucket.org/centraltechnology/centech-api',
                commit: CURRENT_COMMIT || 'auto',
                previousCommit: PREV_COMMIT || 'auto',
              },
            }
          : {}),
      }),
  ].filter(Boolean),
};

module.exports = {
  entry: './src/server.ts',
  target: 'node',
  mode: NODE_ENV,
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
  },
  devtool: devtool[NODE_ENV],
  externals: [nodeExternals({ modulesDir: isDocker ? 'node_modules' : path.resolve(__dirname, '../../node_modules') })],
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
      },
    ],
  },
  plugins: plugins[NODE_ENV],
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // Sentry use classname as fingerprint for Error from MDC
        terserOptions: { keep_classnames: true },
      }),
    ],
  },
  node: {
    global: false,
    __dirname: false,
  },
};
