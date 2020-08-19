import React, { useState } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css'

import Features from '../Features/Features'
import Header from '../Header/Header'
import Signup from '../Authentication/Signup'
import Signin from '../Authentication/Signin'
import Home from '../Home/Home'
import DetailedNote from '../DetailedNote/DetailedNote'
import {UserContext} from '../../UserContext'

/**
 * The root component. Contains all routing info and all the components
 */
function App() {
  // Current authenticated user token. Default value taken from sessionStorage where it is saved on login
  const [user, setUser] = useState(sessionStorage.getItem('jwt'))
  return (
    <div className="App">
      <Router>
        {/* Provide  current authenticated user token to all the components using context*/}
        <UserContext.Provider value={{user, setUser}}>
          <Header />

          <Route path='/' exact>
            <Features />
          </Route>

          <Route path='/signup' exact>
            <Signup />
          </Route>

          <Route path='/signin' exact>
            <Signin />
          </Route>

          <Route path='/home' exact>
            <Home />
          </Route>

          <Route path='/note/:id' component={DetailedNote} />

        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default App
