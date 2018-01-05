# React-universal-ssr
webpack+router4+按需加载+webpack-dev-server

开发环境使用webpack-dev-server做服务端，实现热加载，生产环境使用koa做后端，实现按需加载，页面渲染前加载数据
具体介绍可以查看 https://juejin.im/post/5a392018f265da431b6d5501

1. npm install
2. npm start 运行开发版环境


-------------------------------------------------

1. npm install
2. npm run build 生产环境编译 dist/client+dist/server
3. npm run server 运行koa



-------------------------------------------------
想了解更多可以看下 https://github.com/tzuser/ssr ，不同风格，同样的功能，也是用的 react16+router5+koa2
