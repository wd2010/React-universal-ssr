import {combineReducers} from 'redux';
import {counter,homeInfo} from './home';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  router:routerReducer,
  counter,
  homeInfo,
})