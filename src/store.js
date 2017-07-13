import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import reducer from  './reducer'

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true})
    )
  )
)

export default store
