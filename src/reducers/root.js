import authReducer from './auth'
import workspaceReducer from './workspace'
import todoReducer from './todo'
import todoDetailsReducer from './todoDetails'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
  todo: todoReducer,
  todoDetails: todoDetailsReducer
})

export default rootReducer