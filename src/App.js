import React, { Component } from 'react';
import { connect } from 'react-redux'
import {  Route, Switch ,withRouter} from 'react-router-dom'
import './App.css';
import Login from './Login'
import Questions from './Questions'
import { redirected } from './actions'
import LeaderBoard from './LeaderBoard'

class App extends Component {
  
  renderLoader(props){
    if ( props.app.loading && props.app.loading === true ){
      return(<div className="loading">Loading&#8230;</div>)
    } else{
      return ''
    }
  }
  componentWillReceiveProps(nextProps){
    if ( nextProps.app.redirectTo !== null ){
      nextProps.history.push(nextProps.app.redirectTo)
      nextProps.redirected(null)
    }
  }
  
  render() {
    return (
      <div>
        {this.renderLoader(this.props)}
     
       <Switch>
         <Route path="/dashboard" component={Questions}/>
         <Route path={`/leaderboard`} component={LeaderBoard}/>
         <Route path="/" component={Login}/>
         <Route component={Login}/>
       </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return(
    {
      app:state.app
    }
  )
}

export default withRouter(connect(mapStateToProps,{redirected})(App));
