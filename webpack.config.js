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
    filename:'output.[name].js',
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

//const compiler=webpack(config);
//compiler.run(function doneHandler(err, stats) {
//  //get all errors
//  if(stats.hasErrors()){
//    //打印错误信息
//    printErrors(stats.compilation.errors,true);
//  }
//  const warnings =stats.warnings && stats.warnings.length==0;
//  if(stats.hasWarnings()){
//    //打印warning信息
//    printErrors(stats.compilation.warnings);
//  }
//  console.log("Compilation finished!\n");
//  console.log('=========',stats)
//});

module.exports=config