import {createStore, applyMiddleware,compose} from "redux";
import thunkMiddleware from "redux-thunk";
import createHistory from 'history/createMemoryHistory';
import {  routerReducer, routerMiddleware } from 'react-router-redux'
import rootReducer from '../store/reducers/index.js';

const routerReducers=routerMiddleware(createHistory());//路由
//const composeEnhancers = !!(typeof document !== 'undefined' && window)?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const middleware=[thunkMiddleware,routerReducers];

let configureStore=(initialState)=>createStore(rootReducer,initialState,compose(applyMiddleware(...middleware)));

export default configureStore;
