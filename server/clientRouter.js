import fs from 'fs';
import path from 'path';

const getClientInstance=()=>{
  let clientFolder=path.resolve(__dirname,'../dist/client/');
  let serverFolder=path.resolve(__dirname,'../dist/server/');

  let manifest=require(path.join(`${serverFolder}`,'./manifest.json') )
  let serverFile=path.join(`${serverFolder}`, manifest['server.js'])
  let code=require(path.join(`${serverFolder}`, manifest['server.js']) );
  // let app=code && code.__esModule ? code.default : code;

  console.log(code)
  // let html=require(path.join(`${clientFolder}`,'./index.html') )
}

export default getClientInstance;

