require('babel-polyfill');
require('babel-register')({

  presets: ['env', 'react', 'stage-0'],
  plugins: ["react-loadable/babel",'syntax-dynamic-import',"dynamic-import-node"]
});

const app=require('./app.js').default,
  clientRouter=require('./clientRouter.js').default,
  port = process.env.port || 3002,
  serve = require("koa-static"),
  path =require('path'),
  Loadable=require('react-loadable');

app.use(clientRouter);
app.use(serve(path.resolve(__dirname,'../dist/client')));
app.use(serve(path.resolve(__dirname,'../dist/server')));

console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
Loadable.preloadAll().then(() => {
  app.listen(port)
})


