import React from 'react';
import {hydrate} from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import Loadable from 'react-loadable';
import rootReducer from './store/reducers/index.js';
import app from './app/index.js';
const initialState = window.__INITIAL_STATE__;
let history=createHistory()
let {configureStore,createApp}=app;
let store=configureStore({initialState,rootReducer})

const render=()=>{
  let application=createApp({store,history});
  hydrate(application,document.getElementById('root'));
}

window.main = () => {
  Loadable.preloadReady().then(() => {
    render()
  });
};

if(process.env.NODE_ENV==='development'){
  if(module.hot){
    module.hot.accept('./store/reducers/index.js',()=>{
      import('./store/reducers/index.js').then(({default:module})=>{
        store.replaceReducer(module)
      })
    })
    module.hot.accept('./app/index.js',()=>{
      import('./app/index.js').then(({default:module})=>{
        let {createApp}=module;
        import('./store/reducers/index.js').then(({default:module})=>{
          store.replaceReducer(module)
          let application=createApp({store,history});
          hydrate(application,document.getElementById('root'));
        })
      })
    })
  }
}



