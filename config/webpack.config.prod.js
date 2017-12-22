const path=require('path');
const webpack=require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { ReactLoadablePlugin } =require('react-loadable/webpack') ;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isServer=process.env.BUILD_TYPE==='server';
const rootPath=path.join(__dirname,'../');

const prodConfig={
  context: path.join(rootPath,'./src'),
  entry: {
    client:'./index.js',
    vendors:['react','react-dom','react-loadable','react-redux','redux','react-router-dom','react-router-redux','redux-thunk'],
  },
  output:{
    filename:'[name].[hash:8].js',
    path:path.resolve(rootPath,'./dist'),
    publicPath:'/',
    chunkFilename: '[name]-[hash:8].js',
    // libraryTarget: isServer?'commonjs2':'umd',
  },
  resolve:{
    extensions:[".js",".jsx",".css",".less",".scss",".png",".jpg"],
    modules:[path.resolve(rootPath, "src"), "node_modules"],
  },
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        exclude: /node_modules/,
        include:path.resolve(rootPath, "src"),
        use:{
          loader:'babel-loader',
          options:{
            presets: ['env', 'react', 'stage-0'],
            plugins: ['transform-runtime', 'add-module-exports'] ,
            cacheDirectory: true,
          }
        }
      },{
        test:/\.(css|scss)$/,
        exclude:/node_modules/,
        include: path.resolve(rootPath, "src"),
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',//style-loader将css chunk 插入到html中
          use:[{
            loader: 'css-loader',//css-loader 是处理css文件中的url(),require()等
            options: {
              minimize:true,
            }
          },{
            loader:'postcss-loader',
            options: {
              plugins:()=>[require('autoprefixer')({browsers:'last 5 versions'})],
              minimize:true,
            }
          },{
            loader:'sass-loader',
            options:{
              minimize:true,
            }
          }]
        }),
      },{
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        exclude:/node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'img/[sha512:hash:base64:7].[ext]'
          }
        }
      }
    ]
  },
  plugins:[
    new ManifestPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'css/style.[hash].css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([{from:'favicon.ico',to:rootPath+'./dist'}]),
    new CleanWebpackPlugin(['./dist'],{root: rootPath,}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title:'yyy',
      filename:'index.html',
      template:'./index.ejs',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:['vendors','manifest'],
      minChunks:2
    }),
    new ReactLoadablePlugin({
      filename: path.join(rootPath,'./dist/react-loadable.json'),
    }),
  ]
}

module.exports=prodConfig