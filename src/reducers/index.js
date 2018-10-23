import { combineReducers } from 'redux';
import AppStateReducer from './AppStateReducer';
import Question from './Question'
import Scores from './Scores'

export default combineReducers({
  app: AppStateReducer,
  question:Question,
  scores:Scores
});