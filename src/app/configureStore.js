import {createStore, applyMiddleware,compose} from "redux";
import thunkMiddleware from "redux-thunk";
import createHistory from 'history/createMemoryHistory';
import {  routerReducer, routerMiddleware } from 'react-router-redux'

const routerReducers=routerMiddleware(createHistory());//路由
const composeEnhancers = !!(typeof document !== 'undefined' && window)?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const middleware=[thunkMiddleware,routerReducers];

let configureStore=({initialState,rootReducer})=>createStore(rootReducer,initialState,composeEnhancers(applyMiddleware(...middleware)));

export default configureStore;
