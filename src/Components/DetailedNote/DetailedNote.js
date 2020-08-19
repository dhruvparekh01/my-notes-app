import React, {useState, useEffect} from 'react'
import request from '../../ApiSetup'
import useNotes from '../../useNotes'
import NoteContent from './NoteContent'
import SideBar from './SideBar'

import '../../common.css'

function DetailedNote(props) {
    const [note, setNote] = useState({})

    // get the id from the url
    const id = props.match.params.id

    // import the edit and remove note function from the custom hook. Makes API calls to modify the db
    const { notes, removeNote, editNote, toggleLiked } = useNotes()

    
    // subscribe to id (extracted from url) and fetch the note for that id from db and set it in the state
    useEffect(() => {
        async function fetchNote() {
            const response = await request.get(`/notes/${id}`)
            setNote(await response.data)
        }
        fetchNote()
    }, [id])

    return(
      <div className='flexContainer'>
        <div className='sidebar'>
          <SideBar curNote={note} notes={notes} />
        </div>
        <div className='content'>
          <NoteContent note={note} removeNote={removeNote} editNote={editNote} toggleLiked={toggleLiked} />
        </div>
      </div>
    )
}

export default DetailedNote
