const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: {
    //app: "./src/vue.main.js",
    app: "./src_v2/vue.main.js",
    //print: "./src/print.js",
  },
  devtool: "inline-source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    //publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Output Management",
      filename: "index.html", //生成后的文件名
      template: "src_v2/page.tpl",
      publicPath: "./",
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      //worker_threads: require.resolve("worker_threads"),
    },
    alias: {
      vue$: "vue/dist/vue.esm.js",
      common: path.resolve(__dirname, "src/components/page/common"),
      assets: path.resolve(__dirname, "src/assets"),
      pbm: path.resolve(__dirname, "src/method"),
      msg: path.resolve(__dirname, "src/message"),
      //
      components: path.resolve(__dirname, "src_v2/components"),
      store: path.resolve(__dirname, "src_v2/store"),
    },
  },
};
