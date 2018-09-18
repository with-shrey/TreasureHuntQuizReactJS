import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Leaderboard.css'
import { fetchLeaderBoard, redirected } from './actions'

class LeaderBoard extends Component{
  
  componentWillMount(){
    this.props.fetchLeaderBoard()
    
  }
  renderRows(props){
    return props.scores.scores.map((score,index) => {
      return( <tr key={score.id}><th>{index+1}</th><th>{score.name}</th><th>{score.score}</th><th>{score.average}</th></tr>)
    })
  }
  componentWillReceiveProps(nextProps) {
    if ( sessionStorage.getItem( "key" ) === null ) {
      nextProps.redirected( '/' )
    }
  }
  logout(){
    sessionStorage.clear()
    this.props.redirected( '/' )
  }
  render(){
    return(
      <div className="leader-back">
        <nav className="navbar navbar-inverse navbarx">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand"><img className="headimg" src="/portal/logo.png" alt="logo"/></a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to={`${process.env.PUBLIC_URL}/dashboard`}> Dashboard</Link></li>
                <li onClick={this.logout.bind(this)}><a >Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
  
        <div className="containerx tablett">
          <table className="table table-bordered">
            <tbody className="tablet">
            <tr><th className="user">Rank</th><th className="user">Display Name </th><th className="points">Points </th><th className="rank">Performance Rating</th></tr>
            {this.renderRows(this.props)}
      
            </tbody>
          </table>
        </div>
  </div>

  )
  }
}


const mapStateToProps = (state) => {
  return(
    {
      scores:state.scores
    }
  )
}

export default connect(mapStateToProps,{fetchLeaderBoard,redirected})(LeaderBoard)