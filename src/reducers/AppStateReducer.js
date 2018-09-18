
const INITIAL = {
  loading:false,
  redirectTo:null,
  message:null
}
const AppStateReducer = (state = INITIAL,payload) => {
  switch(payload.type){
    case 'LOADING':
      return Object.assign({},state,{loading: true,message:null})
    case 'FINISHED':
      return Object.assign({},state,payload.payload,{loading:false})
    default:
      return state
  }
}

export default AppStateReducer