import React from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <Router>
      <Header />
      <div className='Content'>
        <Switch>
          <Route path='/' component={HomePage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
