import React from 'react';
import {Provider} from 'react-redux';
import Routers from './router/index';
import Loadable from 'react-loadable';

const createApp=({store,history,modules})=>{
  if(process.env.NODE_ENV==='production'){
    return (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <Routers history={history} />
        </Provider>
      </Loadable.Capture>
    )
  }else{
    return (
      <Provider store={store}>
        <Routers history={history} />
      </Provider>
    )
  }
}


export default createApp;
