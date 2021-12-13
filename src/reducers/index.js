import { combineReducers } from 'redux'
import items from './itemsReducer'
import {loadingBarReducer} from 'react-redux-loading-bar'
export default combineReducers({
    items,
    loadingBar: loadingBarReducer,
  })