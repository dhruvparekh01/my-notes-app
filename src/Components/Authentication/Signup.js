import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'

import '../../common.css'

import Form from '../Form'
import { UserContext } from '../../UserContext'
import request from '../../ApiSetup'

/**
 * Component to show the sign up form and handle the subsequent user actions
 */
function Signup() {
  const history = useHistory()
  const { setUser } = useContext(UserContext)
  
  async function handleSubmit(requestBody, setErrorMessage) {
    try {
      const response = await request.post('/auth/register', requestBody)
      const jwtToken = await response.data

      // Save the jwt token in session storage
      sessionStorage.setItem('jwt', jwtToken)

      // Set the value in shared context
      setUser(requestBody)

      // Redirect to home page
      history.push('/home')
    } 
    catch(e) {
      console.log(e)
      const response = e.response.data
      if (response.errorMessage)
          setErrorMessage(response.errorMessage.message)
      else
          setErrorMessage('Unknown error occured. Please try again later')
    }
  }

  // input fields to pass the Form component to render the Sign Up form
  const inputFields = [
      {name: 'First Name', value: '', varName: 'firstName', type: 'text'},
      {name: 'Last Name', value: '', varName: 'lastName', type: 'text'},
      {name: 'Username', value: '', varName: 'username', type: 'text'},
      {name: 'Email', value: '', varName: 'email', type: 'text'},
      {name: 'Password', value: '', varName: 'password', type: 'password'},
      {name: 'Confirm Password', value: '', varName: 'passwordConfirm', type: 'password'},
    ]

  return (
    <div className="Signup">
        <div className="test">
          <h1>Sign Up</h1>
          <Form formVals={inputFields} onSubmit={handleSubmit} />
        </div>
    </div>
  )
}

export default Signup
