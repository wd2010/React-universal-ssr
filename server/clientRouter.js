import React from 'react';
import fs from 'fs';
import path from 'path';
import createHistory from 'history/createMemoryHistory'
import { getBundles } from 'react-loadable/webpack';
import stats from '../dist/server/react-loadable.json';
import Helmet from 'react-helmet';

const getClientInstance=()=>{
  let clientFolder=path.resolve(__dirname,'../dist/client');
  let serverFolder=path.resolve(__dirname,'../dist/server');
  let manifest=require(path.join(`${serverFolder}`,'./manifest.json') )
  let code=require(`${serverFolder}/${manifest['server.js']}`);//文件必须是libraryTarget为commonjs或commonjs2
  let {configureStore,createApp}=code && code.__esModule ? code.default : code;
  let html=fs.readFileSync(path.join(clientFolder,'index.html'),'utf-8');
  return {configureStore,createApp,html}
}

const createStore=()=>{
  let {configureStore,createApp,html}=getClientInstance();
  let store=configureStore()
  return store;
}

const createTags=()=>{
  let bundles = getBundles(stats, modules);
  let scriptfiles = bundles.filter(bundle => bundle.file.endsWith('.js'));
  let stylefiles = bundles.filter(bundle => bundle.file.endsWith('.css'));
  let scripts=scriptfiles.map(script=>`<script src="/${script.file}"></script>`).join('\n');
  let styles=stylefiles.map(style=>`<link href="/${style.file}" rel="stylesheet"/>`).join('\n');
  return {scripts,styles}
}

const prepHTML=(data,{html,head,rootString,scripts,styles,initState})=>{
  data=data.replace('<html',`<html ${html}`);
  data=data.replace('</head>',`${head} \n ${styles}</head>`);
  data=data.replace('<div id="root"></div>',`<div id="root">${rootString}</div>`);
  data=data.replace('<body>',`<body> \n <script>window.__INITIAL_STATE__ =${JSON.stringify(initState)}</script>`);
  data=data.replace('</body>',`${scripts}</body>`);
  return data;
}

const makeup=(ctx)=>{
  let {createApp,html}=getClientInstance()
  let store=createStore(ctx);
  let initState=store.getState();
  let history=createHistory({initialEntries:[ctx.req.url]});
  let {scripts,styles}=createTags()
  let rootString= renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      {createApp({store,history})}
    </Loadable.Capture>
  );
  let renderedHtml=prepHTML(html,{
    html:helmet.htmlAttributes.toString(),
    head:helmet.title.toString()+helmet.meta.toString()+helmet.link.toString(),
    rootString,
    scripts:scripts,
    styles:styles,
    initState
  })
  return renderedHtml;
}



const clientRouter=async(ctx,next)=>{
  let renderedHtml=makeup(ctx);
  ctx.body=renderedHtml
}

export default clientRouter;

