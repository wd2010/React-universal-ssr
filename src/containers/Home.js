import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions  from '../store/actions/home';
import {Link} from 'react-router-dom';
import {Route, Switch } from 'react-router-dom';
import Page from '../containers/Page';
import  '../assets/css/my.scss'
class Home extends Component{
  state={
    hasError:false,
  }
  componentDidMount(){
    this.props.getHomeInfo()
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    // 在这里可以做异常的上报
    console.log('发送错误':error,info)
  }
  render(){
    let {add,count,homeInfo:{name,age}}=this.props;
    return (
      <div>
        <p>{count}</p>
        <p>名字：{name} - 年龄：{age}</p>
        <button style={{backgroundColor:'#eee'}} onClick={()=>add(count+1)}>增加</button>
        <Link to='/user'>User</Link>
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
