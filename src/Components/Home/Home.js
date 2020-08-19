import React, {useState} from 'react'
import './Home.css'

import AddNote from '../AddNote'
import Notes from './Notes'
import useNotes from '../../useNotes'

/**
 * Home page once the user is authenticated.
 */
function Home() {
    // indicator to check if the user is currently trying to add a new note
    const [addingNote, setAddNote] = useState(false)
    const { notes, addNote, removeNote, editNote, toggleLiked } = useNotes()

    // If the user is not currently adding note, show his existing notes
    if (!addingNote)
      return (
          <div>
              <Notes onAdd={()=>setAddNote(true)} notes={notes} toggleLiked={toggleLiked} removeNote={removeNote} editNote={editNote}/>
          </div>
      )
    // Render the Add note component
    else {
      return (
        <div>
            <AddNote onAdd={()=>setAddNote(false)} addNote={addNote} />
        </div>
      )
    }
}

export default Home
