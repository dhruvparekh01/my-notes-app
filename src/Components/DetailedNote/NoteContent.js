import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import EditNote from '../EditNote'
import AlertDeleteDialog from '../MaterialUI/AlertDeleteDialog'
import {dateHelper} from '../../Helpers'

import '../../common.css'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'

export default function NoteContent({ note, removeNote, editNote, toggleLiked }) {
    const [editing, setEditing] = useState(false)
    const [curNote, setNote] = useState({})
    const [deleting, setDeleting] = useState(false)

    const history = useHistory()

    // subscribe to the note prop. Change the component if the note propp changes
    useEffect(() => {
        setNote(note)
    }, [note])

    function handleEdit(newNote) {
        editNote(newNote)
        .then(setNote(newNote))
        .catch((err) => console.log(err))
    }

    function handleDelete() {
        removeNote(curNote).then(()=>{
          // Redirect to home page  
          history.push('/home')
        })
    }

    async function toggleFavourite() {
      await toggleLiked(curNote)
    }

    return(
        <div style={{textAlign: "left"}}>
          {/* If the editing flag is on, show the EditNote component (EditNote is a fullscreen dialog) */}
          { (editing ? <EditNote note={curNote} onSave={handleEdit} />: null) }
          { (deleting ? <AlertDeleteDialog onDelete={handleDelete} />: null) }

          <div className="hello">
            <Button color="primary" className="hello" onClick={()=>history.push('/home')}><ArrowBackIosIcon /> Back</Button>
          </div>
          <div className="noteHeader">
            <h1>{curNote.title}</h1>
          </div>
          <div className="noteBody">
            <p><strong>Date: </strong><u>{dateHelper(note.modified)}</u></p>
            <p>{curNote.body}</p>
          </div>
          <div className="btns">
            <div className="b">
              <Button variant='outlined' color='primary' onClick={()=>setEditing(true)}> Edit </Button>
            </div>
            <div className="b">
              <Button variant='outlined' color='secondary' onClick={()=>setDeleting(true)} > Delete </Button>
            </div>
            <div className="b">
              {/* Show a different button based on if the note is added to favorite or not*/}
              {
                (note.liked) ? 
                  <Button variant='outlined' color='secondary' onClick={toggleFavourite}>
                    Remove from Favourite 
                  </Button>
                  :
                  <Button variant='outlined' color='secondary' onClick={toggleFavourite} 
                  startIcon={<FavoriteBorderOutlinedIcon color="secondary"/>}>
                      Add to Favourite
                  </Button>
              }
            </div>
          </div>
        </div>
    )
}
