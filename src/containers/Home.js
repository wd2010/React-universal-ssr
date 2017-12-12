import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions  from '../store/actions/home';
import {Link} from 'react-router-dom';
class Home extends Component{
  render(){
    let {add,count}=this.props;
    return (
      <div>
        <p>{count}</p>
        <button onClick={()=>add(count+1)}>ddy</button>
          <Link to='/user'>usdfde</Link>
      </div>
    )
  }
}

const mapStateToProps=(state)=>({
  count: state.counter.count,
})

const mapDispatchToProps=(dispatch)=>bindActionCreators({
  add: actions.add,
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Home)
