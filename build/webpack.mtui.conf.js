var path = require('path')
var webpack = require('webpack')
const utils = require('./utils')
const pkg = require('../package.json')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: path.resolve(__dirname, '../packages/index.js'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: './',
    filename: 'mtui.js',
    library: {
      root: "mtui",
      amd: "mtui",
      commonjs: "mtui"
    },
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: "default"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader?minimize'
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'less-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(ttf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('examples'),
      '~': resolve('packages')
    }
  },
  // devtool: '#source-map',
  plugins: [
    // 注释头
    new webpack.BannerPlugin([
      pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
      'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
      pkg.license + ' license'
    ].join('\n')),
    // 生成mtui.css
    new ExtractTextPlugin({
      filename: './index.css',
      disable: false,
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
