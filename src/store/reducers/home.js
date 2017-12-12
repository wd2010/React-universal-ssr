import {ADD} from '../constants';

export const counter=(state={count:'646'},action)=>{
  switch (action.type){
    case ADD:
      return Object.assign({},state,{count: action.count});
    default:
      return state;
  }
}