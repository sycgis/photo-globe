const path = require('path');
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/index.tsx'
  ],
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx" ],
    mainFields: [ 'browser', 'main' ]
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "tslint-loader",
        enforce: "pre"
      },
      {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre"
      },
      {
        test: /\.tsx?$/,
        use: [ "babel-loader", "awesome-typescript-loader" ]
      },
      {
        test: /\.scss$/,
        use: [ "style-loader", "css-loader", "sass-loader" ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          configuration: require("./tslint.json")
        }
      }
    })
  ],
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },
  stats: {
    errorDetails: true
  }
};
