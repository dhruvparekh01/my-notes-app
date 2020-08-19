import React from 'react'
import { Link } from 'react-router-dom'

import './Features.css'
import titleImg from '../../Assets/images/titleImg.png'

import Button from '@material-ui/core/Button'

/**
 * Laning page for the app.
 */
function Features() {
  return (
    <div className="container">
      <div className="Features">
        <div className="col1">
            <img src={titleImg} alt=""></img>
        </div>

        <div className="col3">
          <ul>
            <li>
              <h3>Welcome to your personal note taking app! Just sign in in and start taking notes.</h3>
            </li>
            <li>
              <h3>Never lose track of important notes across multiple devices.</h3>
            </li>
            <li>
              <h3>Personalised notes that only you have access to!</h3>
            </li>
          </ul>
        </div>
      </div>
      <div className="center">
        <Button variant="contained" color="primary" className="btn" component={Link} to="/signin">Get Started</Button>
      </div>
    </div>
  )
}

export default Features