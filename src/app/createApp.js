import React from 'react';
import {Provider} from 'react-redux';
import Routers from './routes';
import { ConnectedRouter } from 'react-router-redux';
import {Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

let isServer=process.env.BUILD_TYPE=='server';
console.log('isserver------------------',process.env.BUILD_TYPE)
const createApp=({store,history})=>{
  return isServer?(modules)=>(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      {createApp({store,history})}
    </Loadable.Capture>
  ):(
    <Provider store={store}>
      <Routers history={history} />
    </Provider>
  )
}


export default createApp;
