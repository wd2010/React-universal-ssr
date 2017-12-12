import React from 'react';
import {hydrate} from 'react-dom';
import configureStore from './store/configureStore';
import createHistory from 'history/createBrowserHistory'
import createApp from './store/createApp';
import Loadable from 'react-loadable';
import rootReducer from './store/reducers/index.js';

const initialState = window.__INITIAL_STATE__;
const store=configureStore({initialState,rootReducer})
const history=createHistory()

const render=()=>{
  let application=createApp({store,history});
  hydrate(application,document.getElementById('root'));
}


window.main = () => {
  Loadable.preloadReady().then(() => {
    render()
  });
};




