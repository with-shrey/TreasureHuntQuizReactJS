import axios from 'axios'
import { LEADERBOARD, LOGIN, QUESTION, SUBMIT } from '../config'
export const loginUser = (enrollment,name) => dispatch =>{
  dispatch({
    type:'LOADING',
    payload:{}
  })
    axios.post(LOGIN, {enrollment:enrollment, name}
    ).then(response => {
      var data = response.data
      if ( typeof data === 'object' ) {
        if ( data.success === true ){
          sessionStorage.setItem("key", data.token);
          dispatch({
            type:'FINISHED',
            payload:{redirectTo:'/dashboard'}
          })
        }else{
          console.log(data)
          dispatch({
            type:'FINISHED',
            payload:{message:data.message}
          })
        }
      }else {
        console.log( data )
        dispatch( {
          type: 'FINISHED',
          payload: { message: "500 - Internal Error" }
        } )
      }
    }).catch(err => {
      console.error(err)
      dispatch({
        type:'FINISHED',
        payload:{message:err.message}
      })
    })
}

export const redirected = (location) =>dispatch => {
  dispatch({
    type:'FINISHED',
    payload:{redirectTo:location}
  })
}
export const messageDisplayed = () =>dispatch => {
  dispatch({
    type:'FINISHED',
    payload:{message:null}
  })
}

const fetchQues = (dispatch) =>{
 
  axios.post(QUESTION,{},{
      headers: {
        Authorization: sessionStorage.getItem('key'),
      }
    }
  ).then(response => {
    var data = response.data
    if ( typeof data === 'object' ) {
      if ( data.status === true ){
        let q = {}
        if ( data.question === null ){
          q.id = null;
          q.image = null;
        } else{
          q = data.question
          sessionStorage.setItem("question",q.id)
        }
        dispatch({
          type:'QUESTION_FETCHED',
          payload:q
        })
        dispatch( {
          type: 'FINISHED',
          payload: { }
        } )
      }else{
        console.log( data )
        dispatch( {
          type: 'FINISHED',
          payload: { message: data.message }
        } )
      }
    }else {
      console.log( data )
      dispatch( {
        type: 'FINISHED',
        payload: { message: "500 - Internal Error" }
      } )
    }
  }).catch(err => {
    console.error(err)
    dispatch({
      type:'FINISHED',
      payload:{message:err.message}
    })
  })
}

export const getQuestion = () =>dispatch => {
  dispatch({
    type:'LOADING',
    payload:{}
  })
  fetchQues(dispatch)
}

export const submitAnswer = (answer) =>dispatch => {
  dispatch({
    type:'LOADING',
    payload:{}
  })
  axios.post(SUBMIT,{
    answer
    },{
    headers: {
      Authorization: sessionStorage.getItem('key'),
    }
    }
  ).then(response => {
    var data = response.data
    if ( typeof data === 'object' ) {
      if ( data.success === true ){
        fetchQues(dispatch)
      }else {
        if ( data.ques_id === sessionStorage.getItem("question") ) {
          console.log("EQUAL")
          dispatch( {
            type: 'FINISHED',
            payload: { message: data.message }
          } )
        }else{
          fetchQues(dispatch)
        }
      }
    }else{
      dispatch( {
        type: 'FINISHED',
        payload: { message: "500- Server Error" }
      } )
    }
  }).catch(err => {
    console.error(err)
    dispatch({
      type:'FINISHED',
      payload:{message:err.message}
    })
  })
}

export const fetchLeaderBoard = () => (dispatch) =>{
  dispatch({
    type:'LOADING',
    payload:{}
  })
  axios.post(LEADERBOARD,{},{
      headers: {
        Authorization: sessionStorage.getItem('key'),
      }
    }
  ).then(response => {
    var data = response.data
    console.log(data)
    if ( typeof data === 'object' ) {
      if ( data.status === true ){
        console.log(data.scores)
        dispatch({
          type:'SCORES_FETCHED',
          payload:data.scores
        })
        dispatch( {
          type: 'FINISHED',
          payload: { }
        } )
      }else {
        console.log( data )
        dispatch( {
          type: 'FINISHED',
          payload: { message: data.message }
        } )
      }
    }else {
      console.log( data )
      dispatch( {
        type: 'FINISHED',
        payload: { message: "500 - Internal Error" }
      } )
    }
  }).catch(err => {
    console.error(err)
    dispatch({
      type:'FINISHED',
      payload:{message:err.message}
    })
  })
}
