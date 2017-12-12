import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions  from '../store/actions/home';
import {Link } from 'react-router-dom';

class User extends Component{
  render(){
    let {add,count}=this.props;
    return (
      <div>
          <p>{count}</p>
        <Link to='/'>ddsdfd</Link>
        <ul>
            {
                [1,2,3,4,5,6].map((item,index)=>(
                    <li key={index}>aabdb{item}</li>
                ))
            }
        </ul>
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

export default connect(mapStateToProps,mapDispatchToProps)(User)
