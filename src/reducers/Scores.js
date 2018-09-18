
const INITIAL = {
  scores:[]
}
const Scores = (state = INITIAL,payload) => {
  switch(payload.type){
    case 'SCORES_FETCHED':
      return Object.assign({},state,{scores:payload.payload})
    default:
      return state
  }
}

export default Scores