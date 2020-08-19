import React from 'react'
import NoteCard from './NoteCard'

import './Home.css'
import Button from '@material-ui/core/Button'
import NoteAddIcon from '@material-ui/icons/NoteAdd'

/**
 * Component to display a collection of notes
 * @param {object} props Component props
 * @param {fucntion} onAdd function to render the Add Note component instead of this one
 */
function Notes({onAdd, notes, toggleLiked, removeNote, editNote}) {

  return(
    <div>
      <h1>My Notes</h1>
      <div>
        <Button variant="outlined" color="primary" onClick={onAdd} startIcon={<NoteAddIcon/>}> Add note</Button>
      </div>  
      
      <div  className='f-cont'>
        {notes.map((note, i) => (
          <div className="note" key={i}>
            <NoteCard
              note={note}
              toggleLiked={toggleLiked}
              removeNote={removeNote}
              editNote={editNote}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notes
