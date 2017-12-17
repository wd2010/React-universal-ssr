const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const rootPath=path.join(__dirname,'../')
const devConfig={
  context: path.join(rootPath,'./src'),
  entry:{
    client:'./index.js',
    vendors:['react','react-dom','react-loadable','react-redux','redux','react-router-dom','react-router-redux','redux-thunk'],
  },
  output:{
    filename:'[name].[hash:8].js',
    path:path.resolve(rootPath,'./dist/client'),
    publicPath:'/',
    chunkFilename: '[name]-[hash:8].js'
  },
  resolve:{
    extensions:[".js",".jsx","css","less","scss","png","jpg"],
    modules:[path.resolve(rootPath, "src"), "node_modules"],
  },
  devServer:{
    contentBase:'assets',
    hot:true,
    historyApiFallback:true,
  },
  devtool:'source-map',
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        include:path.resolve(rootPath, "src"),
        use:{
          loader:'babel-loader',
          options:{
            presets: ['env', 'react', 'stage-0'],
            plugins: ['transform-runtime', 'add-module-exports'],
            cacheDirectory: true,
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
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({summary: false}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV||'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:['vendors','manifest'],
      minChunks:2
    }),
    new HtmlWebpackPlugin({
      title:'test1',
      filename:'index.html',
      template:'./index.ejs',
    }),
  ],
}

module.exports=devConfig