require('babel-polyfill');
require('babel-register')({
  presets: ['env', 'react', 'stage-0'],
});

const app=require('./app.js').default,
  webpack=require('webpack'),
  fs=require('fs'),
  path = require('path'),

  // config = require('../config/webpack.config.prod.js'),
  // compiler = webpack(config),
  clientRouter=require('./clientRouter.js').default,
  port = process.env.port || 3002,
  Loadable=require('react-loadable');

clientRouter()
// app.use(clientRouter);

Loadable.preloadAll().then(() => {
  app.listen(port)
})


