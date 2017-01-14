module.exports = {
  devtool: "eval-source-map",
  entry: __dirname + "/src/index.ts",
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/dist/",
    filename: "[name].js",
    publicPath: "/"
  },
  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "tslint-loader",
        query: ""
      },
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ],
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  tslint: {
    configuration: require("./tslint.json")
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
};
