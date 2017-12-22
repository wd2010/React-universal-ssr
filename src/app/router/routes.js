import React from 'react';
import Loadable from 'react-loadable';
import {homeThunk} from '../../store/actions/thunk';

const Loading=(props)=>{
  console.log(props)
  return <div>Loading...</div>
}

const LoadableHome = Loadable({
  loader: () =>import(/* webpackChunkName: 'Home' */'../../containers/Home'),
  loading: Loading,
});
const LoadableUser = Loadable({
  loader: () =>import(/* webpackChunkName: 'User' */'../../containers/User'),
  loading: Loading,
});

const routesConfig=[{
  path: '/',
  exact: true,
  component: LoadableHome,
  thunk: homeThunk,
}, {
  path: '/user',
  component: LoadableUser,
  thunk: ()=>{},
}];

export default routesConfig;




