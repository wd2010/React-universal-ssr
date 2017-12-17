import React from 'react'
import {Route, Switch } from 'react-router-dom';
import  {ConnectedRouter}  from 'react-router-redux';
import routesConfig from './routes';

const Routers=({history})=>(
  <ConnectedRouter history={history}>
    <div>
      {
        routesConfig.map(route=>(
          <Route key={route.path} exact={route.exact} path={route.path} component={route.component}  thunk={route.thunk}  />
        ))
      }
    </div>
  </ConnectedRouter>
)

export default Routers;