import path from 'path';
import fs from 'fs';

const getClientInstance=()=>{
  let clientFolder=path.resolve(__dirname,'../dist/client');
  let serverFolder=path.resolve(__dirname,'../dist/server');
  let manifest=require(path.join(`${serverFolder}`,'./manifest.json') )
  let code=require(`${serverFolder}/${manifest['server.js']}`);//文件必须是libraryTarget为commonjs或commonjs2
  let {configureStore,createApp,routesConfig}=code && code.__esModule ? code.default : code;
  let html=fs.readFileSync(path.join(clientFolder,'index.html'),'utf-8');
  return {configureStore,createApp,html,routesConfig}
}

export default getClientInstance