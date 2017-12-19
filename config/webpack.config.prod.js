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
  entry:()=>{
    if(isServer){
      return {
        server: './app/index.js',
      }
    }else{
      return {
        client:'./index.js',
        vendors:['react','react-dom','react-loadable','react-redux','redux','react-router-dom','react-router-redux','redux-thunk'],
      }
    }
  },
  output:{
    filename:'[name].[hash:8].js',
    path:path.resolve(rootPath,isServer?'./dist/server':'./dist/client'),
    publicPath:'/',
    chunkFilename: '[name]-[hash:8].js',
    libraryTarget: 'umd',
  },
  resolve:{
    extensions:[".js",".jsx","css","less","scss","png","jpg"],
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
            plugins: isServer ? ['dynamic-import-webpack','remove-webpack',"react-loadable/babel"] : ['transform-runtime',"react-loadable/babel",],//server 动态加载的Home和User,require动态加载时会导致一些全局问题，remove-webpack使用IIFE自动执行函数解决
            cacheDirectory: true,
          }
        }
      },{
        test:/\.(css|less)$/,
        exclude:/node_modules/,
        include: path.resolve(rootPath, "src"),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',//style-loader将css chunk 插入到html中
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
            loader:'less-loader',
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
      disable: isServer ,
    }),
    new CopyWebpackPlugin([{from:'favicon.ico',to:rootPath+'./dist/client'}]),
    new CleanWebpackPlugin([`./dist/${isServer?'server':'client'}`],{root: rootPath,}),
    new webpack.DefinePlugin({
      'process.env.BUILD_TYPE':JSON.stringify(process.env.BUILD_TYPE)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ].concat(isServer?[
    //server ----------
  ]:[
    //client-----------
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
      filename: path.join(rootPath,'./dist/server/react-loadable.json'),
    }),

  ])
}

module.exports=prodConfig