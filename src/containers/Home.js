import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions  from '../store/actions/home';
import {Link} from 'react-router-dom';
import Loadable from 'react-loadable';
import {Route, Switch } from 'react-router-dom';
import Page from '../containers/Page';


class Home extends Component{

  componentDidMount(){
    this.props.getHomeInfo()
  }
  render(){
    let {add,count,homeInfo:{name,age}}=this.props;
    return (
      <div>
        <p>{count}</p>
        <p>名字：{name} - 年龄：{age}</p>
        <button onClick={()=>add(count+1)}>dr6</button>
        <Link to='/user'>rrdr </Link>
        <Link to='/page' > Padge</Link>
        <div style={{width:'100px',height:'100px',borderColor:'1px solid red'}}>

          <Route exact={true} path='/page' component={Page} key='page' thunk={()=>{}} />
        </div>

      </div>
    )
  }
}

const mapStateToProps=(state)=>({
  count: state.counter.count,
  homeInfo: state.homeInfo,
})

const mapDispatchToProps=(dispatch)=>bindActionCreators({
  add: actions.add,
  getHomeInfo: actions.getHomeInfo,
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Home)
