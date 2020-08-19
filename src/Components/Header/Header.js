import React, {useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'

import './Header.css'
import Button from '@material-ui/core/Button'
import logo from '../../Assets/images/logo.png'

import request from '../../ApiSetup'
import { UserContext } from '../../UserContext'

/**
 * App header. Contains the Logo and authenticaltion buttons
 */
function Header() {
  const history = useHistory()
  const {user, setUser} = useContext(UserContext)

  async function handleLogout() {
    await request.post('/auth/logout')

    // Remove the JWT token from the session storage and shared context
    sessionStorage.removeItem('jwt')
    setUser(null)

    // Redirect to the index page
    history.push('/')
  }

  return (
    <div className="Header">
      <div className="logo">
        {
          // if the user is authenticated, redirect to home page else redirect to landing page
          (user) ?
          <Link to='/home'>
            <img src={logo} width="60em" height="40em" className="headerImg" alt="Logo"></img>
          </Link>
          :
          <Link to='/'>
            <img src={logo} width="60em" height="40em" className="headerImg" alt="Logo"></img>
          </Link>
        }
      </div>

      {/* Render Login-Signup buttons if user is not logged in else render the logout button */}
      {user ? (
        <div className="btns">
          <Button variant="outlined" color="secondary" className="btn" onClick={handleLogout}>Log Out</Button>
        </div>
      ) : (
        <div className="btns">
          <div className="b">
            <Button variant="contained" color="primary" className="btn" component={Link} to="/signin">Login</Button>
          </div>
          <div className="b">
            <Button variant="outlined" color="primary" className="btn" component={Link} to="/signup">Sign Up</Button>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Header