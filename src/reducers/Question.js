
const INITIAL = {
 id:0,
  image:''
}
const Question = (state = INITIAL,payload) => {
  switch(payload.type){
    case 'QUESTION_FETCHED':
      return Object.assign({},state,payload.payload)
    default:
      return state
  }
}

export default Question