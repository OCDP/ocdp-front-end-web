const fs = require("fs");
const path = require("path");
const lessToJs = require("less-vars-to-js");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const darkTheme = require("@ant-design/dark-theme");
const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");

const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
} = require("customize-cra");

const paletteLess = fs.readFileSync("./src/styles/variables.less", "utf8");
const variables = lessToJs(paletteLess);
const options = {
  stylesDir: path.join(__dirname, "./src/styles"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  varFile: path.join(__dirname, "./src/styles/variables.less"),
  mainLessFile: path.join(__dirname, "./src/styles/index.less"),
  themeVariables: Object.keys(variables),
  generateOnce: false, // generate color.less on each compilation
};

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, // change importing css to less
  }),
  addWebpackPlugin(new AntDesignThemePlugin(options)),
  addWebpackPlugin(new MonacoEditorWebpackPlugin()),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { ...variables, ...darkTheme.default },
  })
);
