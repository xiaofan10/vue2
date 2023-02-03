const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { VueLoaderPlugin } = require("vue-loader");

const ENV = process.env.NODE_ENV;
module.exports = {
  mode: ENV,
  entry: "./src/main.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // resolve: {
  //   symlinks: false,
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "vue-style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 200000, // bytes
      minChunks: 1,
    },
    minimizer: [
      new TerserPlugin({
        extractComments: false, //不将注释提取到单独的文件中
      }),
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "Vue手脚架",
    }),
  ],
};
