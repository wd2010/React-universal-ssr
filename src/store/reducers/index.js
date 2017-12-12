import {combineReducers} from 'redux';
import {counter} from './home';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  router:routerReducer,
  counter,
})