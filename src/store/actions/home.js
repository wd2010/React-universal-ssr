import {ADD,GET_HOME_INFO} from '../constants'

export const add=(count)=>({
  type: ADD,
  count,
})

export const getHomeInfo=()=>async(dispatch,getState)=>{
  let homeInfo=await new Promise(resolve=>{
    let homeInfo={name:'wd2010',age:'22'}
    setTimeout(()=>resolve(homeInfo),1000)
  })
  dispatch({type:GET_HOME_INFO,data:homeInfo})
}

//export const getHomeInfo=()=>({type:GET_HOME_INFO,data:{name:'wd2010',age:'23'}})