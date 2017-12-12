import {ADD} from '../constants'

export const add=(count)=>({
  type: ADD,
  count,
})