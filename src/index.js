// MODULES
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux';
import Store from './store';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

// FILES
import Home from './Home'
import './index.css'

render(
  <Provider store={Store}>
    <Home />
  </Provider>,
  document.getElementById('root')
)
