import thunk from 'redux-thunk'
import {
  combineReducers,
  createStore,
  applyMiddleware,
  Store,
  Dispatch,
  AnyAction
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import settings from './settings'
import attachments from './attachments'
import storage from 'utils/storage'

export const persistStore = (
  store: Store<AppState>,
  _key: 'attachments' | 'settings',
  override: Partial<AppState & any> = {}
) => {
  const nextState = store.getState()[_key]
  Object.keys(override).forEach(key => (nextState[key] = override[key]))
  storage.setValue(`serialized__${String(_key)}`, JSON.stringify(nextState))
}

const reducers = {
  settings,
  attachments
}

const serializer = () => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  const res = next(action)
  persistStore(store, 'attachments')
  return res
}

const rootReducer = combineReducers(reducers)

const reducerWithMiddlewares = applyMiddleware(thunk, serializer)
export const store = createStore(
  rootReducer,
  composeWithDevTools(reducerWithMiddlewares)
)

export type AppState = ReturnType<typeof rootReducer>
