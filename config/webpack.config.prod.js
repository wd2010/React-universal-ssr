const path=require('path');
const webpack=require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { ReactLoadablePlugin } =require('react-loadable/webpack') ;
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
    libraryTarget: isServer ? 'commonjs2' : 'umd',
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
            plugins: isServer ? ['dynamic-import-webpack'] : [],//server 动态加载的Home和User
          }
        }
      },{
        test:/\.css$/,
        exclude: /node_modules/,
        include: path.resolve(rootPath, "src"),
        use: ['style-loader','css-loader']
      }
    ]
  },
  plugins:[
    new ManifestPlugin(),
    new CleanWebpackPlugin([`./dist/${isServer?'server':'client'}`],{root: rootPath,}),
  ].concat(isServer?[
    //server ----------
    new ReactLoadablePlugin({
      filename: path.join(rootPath,'./dist/server/react-loadable.json'),
    }),
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
  ])
}

module.exports=prodConfig