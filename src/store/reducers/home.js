import {ADD} from '../constants';

export const counter=(state={count:'777'},action)=>{
  switch (action.type){
    case ADD:
      debugger
      return Object.assign({},state,{count: action.count});
    default:
      return state;
  }
}