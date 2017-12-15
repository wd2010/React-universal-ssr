import React from 'react'
import {Route, Switch } from 'react-router-dom';
import  {ConnectedRouter}  from 'react-router-redux';

import Loadable from 'react-loadable';

const Loading=(props)=> {
  console.log('loadable:',props)
  if (props.error) {
    return <div>{props.error}</div>;
  } else {
    return <div>Loading...</div>;
  }
}

const LoadableHome = Loadable({
  loader: () =>import(/* webpackChunkName: 'Home' */'../containers/Home'),
  loading: Loading,
});
const LoadableUser = Loadable({
  loader: () =>import(/* webpackChunkName: 'User' */'../containers/User'),
  loading: Loading,
});

export const routesConfig=[
  <Route exact={true} path='/' component={LoadableHome} key='home' />,
  <Route path='/user' component={LoadableUser} key='user' />
]

const Routers=({history})=>(
    <ConnectedRouter history={history}>
      <div>
        {routesConfig}
      </div>
    </ConnectedRouter>
)

export default Routers;



