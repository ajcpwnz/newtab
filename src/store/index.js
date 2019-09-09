import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import settings from './settings'
import attachments from './attachments'
import storage from 'utils/storage'

export const persistStore = (store, _key, override = {}) => {
  const nextState = store.getState()[_key]
  Object.keys(override).map(key => nextState[key] = override[key])
  storage.setValue(`serialized__${_key}`, JSON.stringify(nextState))
}

const reducers = {
  settings,
  attachments
}

const serializer = () => next => action => {
  const res = next(action)
  persistStore(store, 'attachments')
  return res
}


const rootReducer = combineReducers(reducers)

const reducerWithMiddlewares = applyMiddleware(thunk, serializer)
export const store = createStore(rootReducer, composeWithDevTools(reducerWithMiddlewares))
window.store = store
