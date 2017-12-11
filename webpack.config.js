const path=require('path');
const webpack=require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config={
  context:path.join(__dirname,'./src/'),
  entry:{
    app:'./index.js',
    main:'./main.js',
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist'),
    publicPath:'/'
  },
  devServer:{
    contentBase:'assets',
    hot:true
  },
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        exclude: /node_modules/,
        use:{
          loader:'babel-loader',
        }
      },{
        test:/\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title:'my demo',
      filename:'index.html',
      template:'./index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:['chunk','manifest'],
      minChunks:2
    })
  ]
}

module.exports=config