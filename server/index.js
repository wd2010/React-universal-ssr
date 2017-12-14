require('babel-polyfill');
require('babel-register')({
  presets: ['env', 'react', 'stage-0'],
  //plugins: ["react-loadable/babel"]
});

const app=require('./app.js').default,

  clientRouter=require('./clientRouter.js').default,
  port = process.env.port || 3002,
  Loadable=require('react-loadable');


app.use(clientRouter);
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
Loadable.preloadAll().then(() => {
  app.listen(port)
})


