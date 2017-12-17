import {ADD,GET_HOME_INFO} from '../constants';

export const counter=(state={count:33},action)=>{
  switch (action.type){
    case ADD:
      return Object.assign({},state,{count: action.count});
    default:
      return state;
  }
}

export const homeInfo=(state={name:'',age:''},action)=>{
  switch(action.type){
    case GET_HOME_INFO:
      return Object.assign({},state,action.data);
    default:
      return state;
  }
}