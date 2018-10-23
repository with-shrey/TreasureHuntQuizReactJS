import React,{ Component } from 'react'
import { connect } from 'react-redux'
import  './Login.css'
import $ from 'jquery'

import { loginUser, messageDisplayed } from './actions'

class Login extends Component{
  constructor(props){
    super(props)
    this.state = {enroll:'',pass:''}
    window.sessionStorage.clear()
    
  }
  componentDidMount(){
      $(".loader").fadeOut(3500, function() {
      
        $(".loader").fadeOut(500);
      
      });
    $(".input input").focus(function() {
    
      $(this).parent(".input").each(function() {
        $("label", this).css({
          "line-height": "18px",
          "font-size": "18px",
          "font-weight": "100",
          "top": "0px"
        })
        $(".spin", this).css({
          "width": "100%"
        })
      });
    }).blur(function() {
      $(".spin").css({
        "width": "0px"
      })
      if ($(this).val() === "") {
        $(this).parent(".input").each(function() {
          $("label", this).css({
            "line-height": "60px",
            "font-size": "24px",
            "font-weight": "300",
            "top": "10px"
          })
        });
      
      }
    });
  
    $(".button").click(function(e) {
      var pX = e.pageX,
        pY = e.pageY,
        oX = parseInt($(this).offset().left),
        oY = parseInt($(this).offset().top);
    
      $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
      $('.x-' + oX + '.y-' + oY + '').animate({
        "width": "500px",
        "height": "500px",
        "top": "-250px",
        "left": "-250px",
      
      }, 600);
      $("button", this).addClass('active');
    })
  
    $(".alt-2").click(function() {
      if (!$(this).hasClass('material-button')) {
        $(".shape").css({
          "width": "100%",
          "height": "100%",
          "transform": "rotate(0deg)"
        })
      
        setTimeout(function() {
          $(".overbox").css({
            "overflow": "initial"
          })
        }, 600)
      
        $(this).animate({
          "width": "140px",
          "height": "140px"
        }, 500, function() {
          $(".box").removeClass("back");
        
          $(this).removeClass('active')
        });
      
        $(".overbox .title").fadeOut(300);
        $(".overbox .input").fadeOut(300);
        $(".overbox .button").fadeOut(300);
      
        $(".alt-2").addClass('material-buton');
      }
    
    })
  
    $(".material-button").click(function() {
    
      if ($(this).hasClass('material-button')) {
        setTimeout(function() {
          $(".overbox").css({
            "overflow": "hidden"
          })
          $(".box").addClass("back");
        }, 200)
        $(this).addClass('active').animate({
          "width": "700px",
          "height": "700px"
        });
      
        setTimeout(function() {
          $(".shape").css({
            "width": "50%",
            "height": "50%",
            "transform": "rotate(45deg)"
          })
        
          $(".overbox .title").fadeIn(300);
          $(".overbox .input").fadeIn(300);
          $(".overbox .button").fadeIn(300);
        }, 700)
      
        $(this).removeClass('material-button');
      
      }
    
      if ($(".alt-2").hasClass('material-buton')) {
        $(".alt-2").removeClass('material-buton');
        $(".alt-2").addClass('material-button');
      }
    
    });
      
  }
  handleChange(e) {
    var value = e.target.value;
    this.setState({[e.target.name]: value});
  }
  submitLogin(){
    this.props.loginUser(this.state.enroll,this.state.pass)
  }
  
  renderError(props){
    if ( props.app.message && props.app.message !==null ) {
      this.props.messageDisplayed()
      return(alert(props.app.message))
    }
  }
  
  render(){
    return(
      <div className="back-login">
        <div className="loader">
          <div className="inner" style={{background:'url("image.jpg") center center no-repeat'}}>
          </div>
        </div>
        <div className="materialContainerLogin">
          {this.renderError(this.props)}
  
          <div className="box">
      
            <div className="title" style={{marginTop: '20px'}}>Login</div>
            
            <div className="input">
              <label htmlFor="name">Enroll Number</label>
              <input type="text" name="enroll" id="name" value={this.state.enroll} onChange={this.handleChange.bind(this)} />
                <span className="spin"></span>
            </div>
            
            <div className="input">
              <label htmlFor="pass">Display Name</label>
              <input type="text" name="pass" id="pass" value={this.state.pass} onChange={this.handleChange.bind(this)}  />
            
              <span className="spin"></span>
            </div>
      
            <div className="button login">
              <button onClick={this.submitLogin.bind(this)}><span>Sign In</span> <i className="fa fa-check"></i></button>
            </div>
    
          </div>
    
          
  
        </div>
  
        <div className="nocy">
          <a className="names" style={{backgroundImage: 'url("Untitled.png")'}} href="#"><span><strong>Developed By</strong><br/>Shrey Gupta<br/>Abhishek Chauhan<br/>Zunaid Ahmed<br/>Priyanshu Mittal<br/>Manan Goel<br/>Kartik Agarwal<br/>Kartik Garg</span></a>
  
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return(
    {
      app:state.app
    }
  )
}

export default connect(mapStateToProps,{loginUser,messageDisplayed})(Login)