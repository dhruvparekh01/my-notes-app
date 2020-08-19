import React, {useState} from 'react'

import TextField from '@material-ui/core/TextField'
import {StyledButton, StyledButtonOutlined} from './MaterialUI/StyledComponents'
import '../common.css'

/**
 * Component to add a new note for the currently authenticated user
 * @param {object} props Component props
 * @param {function} onAdd function to signal the parent component that note has been added
 */
function AddNote({ onAdd, addNote }) {
  // title and body for the new note
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const onFormSubmit = async (setErrorMessage) => {
    const note = {
      title: title,
      body: body
    }

    try {
      await addNote(note)
    } catch {
      setErrorMessage("Something's wrong. Try again later")
    }
    onAdd()
  }

  return(
    <div className="addNote">
      <div className="test">
        <h1> Add a new note</h1>

        <form>
          <TextField
            label="Title"
            value={title}
            type="text"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)} />
          
          <TextField
            label="Body"
            value={body}
            type="text"
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) => setBody(e.target.value)} />
        
          <div className="idk">
            <div className="fle">
              <StyledButton onClick={onFormSubmit} variant="contained" color="primary" className="btn">
              Add
              </StyledButton>
            </div>
            <div className="fle">
              <StyledButtonOutlined type="button" onClick={onAdd}>Cancel</StyledButtonOutlined>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default AddNote
