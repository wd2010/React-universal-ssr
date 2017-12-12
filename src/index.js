import React from 'react';
import {hydrate} from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import Loadable from 'react-loadable';
import rootReducer from './store/reducers/index.js';
import app from './app/index.js';
const initialState = window.__INITIAL_STATE__;
let history=createHistory()

const render=(app)=>{
  let {configureStore,createApp}=app;
  let store=configureStore({initialState,rootReducer})

  let application=createApp({store,history});
  hydrate(application,document.getElementById('root'));
}

window.main = () => {
  Loadable.preloadReady().then(() => {
    render(app)
  });
};

if(process.env.NODE_ENV==='development'){
  if(module.hot){
    module.hot.accept('./store/reducers/index.js',()=>{
      import('./store/reducers/index.js').then(module=>{
        store.replaceReducer(module.default)
      })
    })
    module.hot.accept('./app/index.js',()=>{
      import('./app/index.js').then(module=>{
        render(module.default)
      })
    })
  }
}



