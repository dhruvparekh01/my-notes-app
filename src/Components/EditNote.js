import React, {useState, useEffect} from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }))

/**
 * Dialog box with text boxes to edit the note
 * @param {object} props Component props
 */
export default function EditNote({note, onSave}) {
    let [open, setOpen] = useState(true)
    let [title, setTitle] = useState(note.title)
    let [body, setBody] = useState(note.body)
    const classes = useStyles()

    // Subscribe to the props to update the value in the title and body text boxes to show the original note value
    useEffect(() => {
      setTitle(note.title)
      setBody(note.body)
    }, [note])
  
    const handleClose = () => {
      setOpen(false)
    }

    const handleSave = () => {
      let newNote = note
      newNote.title= title
      newNote.body = body
      onSave(newNote)
      setOpen(false)
    }

    return (
      <div>
        <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit Note
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              value={title}
              variant="outlined"
              onChange={e => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="body"
              label="Body"
              type="text"
              multiline
              rows={5}
              value={body}
              variant="outlined"
              onChange={e => setBody(e.target.value)}
              fullWidth
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
