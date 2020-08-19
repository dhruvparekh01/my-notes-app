import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import {StyledButton} from './MaterialUI/StyledComponents'

/**
 * A reusable form component. Takes in an array containing the input labels and types and a callback to execute
 * on form submit.
 * @param {object} props Component props.
 * @param {Array} formVals Array of objects containing the following keys: {name, value, varName, type}.
 * @param {function} onSubmit function to execute on submit.
 */
function Form({formVals, onSubmit}) {
  const [formInputs, setFormInputs] = useState(formVals)
  const [errorMessage, setErrorMessage] = useState('')

  const onFormSubmit = (event) => {
    event.preventDefault()

    // onSubmit takes an object as parameter. This object is of name-value pairs of the inputs obtained
    // from the form. Transforming the inputVals to this format.

    let output = {}

    for (let item of formInputs) {
        output[item.varName] = item.value
    }
    onSubmit(output, setErrorMessage)
  }

  // Handle all changes in the form inputs. Change the 'value' keys in the formInputs state variable
  function change(i, value) {
    let oldVals = formInputs.slice()
    oldVals[i].value = value
    setFormInputs(oldVals)
  }
  return (
    <form onSubmit={onFormSubmit}>
    {
      formInputs.map((field, i) => (
        <TextField
        label={field.name}
        value={field.value}
        type={field.type}
        variant="outlined"
        key={i}
        onChange={(e) => change(i, e.target.value)} />
      ))
    }
    
    <StyledButton type="submit" variant="contained" color="primary" className="btn">
        Submit
    </StyledButton>

    {errorMessage}

    </form>
  )
}

export default Form
