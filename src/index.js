import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble
} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter } from 'react-router-dom'
import NoteErrorBoundary from './Components/NoteErrorBoundary/NoteErrorBoundary'
import './index.css'
import App from './App/App'

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble)

ReactDOM.render(
  <NoteErrorBoundary>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </NoteErrorBoundary>,
  document.getElementById('root')
)