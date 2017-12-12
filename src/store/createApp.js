import React from 'react';
import {Provider} from 'react-redux';
import Routers from '../routes';
import { ConnectedRouter } from 'react-router-redux';
import {Route, Switch } from 'react-router-dom';
const createApp=({store,history})=>
  <Provider store={store}>
      <Routers history={history} />
  </Provider>


export default createApp;
