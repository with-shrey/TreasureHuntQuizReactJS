import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Questions.css'
import { getQuestion, messageDisplayed, redirected, submitAnswer } from './actions'
import { Link } from 'react-router-dom'

class Questions extends Component{
  constructor(props){
    super(props)
    this.state= {
      answer:''
    }
  }
  componentWillMount(){
    this.props.getQuestion()
  
  }
  componentWillReceiveProps(nextProps) {
    this.setState({answer: ''})
    if ( sessionStorage.getItem( "key" ) === null ) {
      nextProps.redirected( '/' )
    }
    if ( nextProps.question.image === null ){
      nextProps.redirected( '/leaderboard' )
    }
  }
  leaderboard(){
    this.props.redirected('/leaderboard')
  }
  logout(){
    sessionStorage.clear()
  }
  
  
  handleChange(e) {
    var value = e.target.value;
    this.setState({[e.target.name]: value});
  }
  submitAnswer(){
    this.props.submitAnswer(this.state.answer)
  }
  renderError(props){
    if ( props.app.message && props.app.message !==null ) {
      this.props.messageDisplayed()
      return(alert(props.app.message))
    }
  }
  render() {
    return (
      <div className="back-dash">
        <div>
          {this.renderError(this.props)}
          <nav className="navbar navbar-inverse navbarx">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="buttonques" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand"><img className="headimg" src="/portal/logo.png" alt="logo"/></a>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav navbar-right">
                  <li><a target="_blank" href="https://www.facebook.com/JuetFirefoxClub"> Hints</a></li>
                  <li onClick={this.leaderboard.bind(this)}><a href="#"> LeaderBoard</a></li>
                  <li onClick={this.logout.bind(this)}><a href="#"> Logout</a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container-fluid">
            
            <div className="banner">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <img className="image-ques" src={this.props.question.image} alt="question"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <input className="input-answer" name="answer" type="text" onChange={this.handleChange.bind(this)} value={this.state.answer} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5"></div>
              <div className="col-md-5">
                <button onClick={this.submitAnswer.bind(this)} className="buttonques" style={{verticalAlign:'middle'}}><span>Submit</span></button>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <br/>
      </div>
      )
   }
  }


const mapStateToProps = (state) => {
  return(
    {
      question:state.question,
      app:state.app
    }
  )
}
  
  export default connect(mapStateToProps,{redirected,getQuestion,submitAnswer,messageDisplayed})(Questions)