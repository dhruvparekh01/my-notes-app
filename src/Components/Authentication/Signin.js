import React, { useContext, useState } from 'react'
import {useHistory} from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import '../../common.css'

import Form from '../Form'
import { UserContext } from '../../UserContext'
import request from '../../ApiSetup'

/**
 * Component to show the sign in form and handle the subsequent user actions
 */
function Signin() {
  const history = useHistory()
  const {setUser} = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  
  async function handleSubmit(requestBody, setErrorMessage) {
    try {
      setIsLoading(true)
      const response = await request.post('/auth/login', requestBody)
      const jwtToken = await response.data

      // Save the jwt token in session storage
      sessionStorage.setItem('jwt', jwtToken)

      // Set the value in shared context
      setUser(jwtToken)

      setIsLoading(false)

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

  // input fields to pass the Form component to render the Sign In form
  const inputFields = [
    {name: 'username', value: '', varName: 'username', type: 'text'}, 
    {name: 'password', value: '', varName: 'password', type: 'password'}
  ]

  return (
    <div className="Signup">
      {!isLoading ? 
        <div className="test">
          <h1>Sign In</h1>
          <Form formVals={inputFields} onSubmit={handleSubmit} />
        </div> :
        <CircularProgress />
      }
    </div>
  )
}

export default Signin
