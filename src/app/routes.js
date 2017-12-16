import React from 'react'
import {Route, Switch } from 'react-router-dom';
import  {ConnectedRouter}  from 'react-router-redux';
import Loadable from 'react-loadable';
import {homeThunk} from '../store/actions/thunk';

const Loading=(props)=>
  <div>Loading...</div>

const LoadableHome = Loadable({
  loader: () =>import(/* webpackChunkName: 'Home' */'../containers/Home'),
  loading: Loading,
});
const LoadableUser = Loadable({
  loader: () =>import(/* webpackChunkName: 'User' */'../containers/User'),
  loading: Loading,
});

export const routesConfig=[
  <Route exact={true} path='/' component={LoadableHome} key='home' thunk={homeThunk}  />,
  <Route path='/user' component={LoadableUser} key='user' thunk={()=>{}} />
]

const Routers=({history})=>(
    <ConnectedRouter history={history}>
      <div>
        {routesConfig}
      </div>
    </ConnectedRouter>
)

export default Routers;



