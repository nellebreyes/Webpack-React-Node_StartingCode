const path = require("path");
const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
];
module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "app"),
  },
  devServer: {
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    historyApiFallback: { index: "index.html" },
    host:
      "0.0.0.0" /*will allow the devices connected to the same wifi to view our site*/,
  },
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader?url=false",
          { loader: "postcss-loader", options: { plugins: postCSSPlugins } },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              ["@babel/preset-env", { targets: { node: "12" } }],
            ],
          },
        },
      },
    ],
  },
};
