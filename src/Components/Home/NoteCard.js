import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {dateHelper} from '../../Helpers'
import EditNote from '../EditNote'
import AlertDeleteDialog from '../MaterialUI/AlertDeleteDialog'
import OptionsMenu from './OptionsMenu'
import ShareMenu from './ShareMenu'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import Button from '@material-ui/core/Button'
import SimpleSnackbar from '../MaterialUI/Snackbar'


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
  }))
  
  export default function NoteCard({note, toggleLiked, removeNote, editNote}) {
    const classes = useStyles()
    const [liked, setLiked] = useState(note.liked)
    const [snackbarMessage, setSnackbarMessage] = useState()
    const [showDeleteAlert, setDeleteAlert] = useState(false)
    const [showEditDialog, setEditDialog] = useState(false)
    const history = useHistory()

    async function toggleLike() {
      setLiked(!liked)
      await toggleLiked(note)
    }

    function writeToClipboard() {
      let noteString = note.title
      noteString += '\n' + dateHelper(note.modified) + '\n\n' + note.body
      navigator.clipboard.writeText(noteString)
    }

    async function deleteNote() {
      await removeNote(note)
    }

    function openNote() {
      history.push(`/note/${note._id}`)
    }

    function showBody(noteBody) {
      if (noteBody.length < 30)
        return noteBody
      
      return noteBody.substr(30) + '...'
    }
  
    return (
      <Card className={classes.root} style={{height: '14em', width: '22em'}}>
        {(snackbarMessage) ? <SimpleSnackbar message={snackbarMessage} setMessage={setSnackbarMessage} /> : null}
        {(showDeleteAlert) ? <AlertDeleteDialog onDelete={deleteNote} /> : null}
        {(showEditDialog) ? <EditNote note={note} onSave={editNote} /> : null}

        <CardHeader
          action={
            <OptionsMenu editNote={()=>setEditDialog(true)} deleteNote={()=>setDeleteAlert(true)} />
          }
          title={note.title}
          subheader={dateHelper(note.modified)}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {showBody(note.body)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={toggleLike}>
              {(liked) ? <FavoriteIcon color="secondary"/> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
          <ShareMenu copyToClipboard={writeToClipboard} openSnackbar={setSnackbarMessage} />
          <Button className={clsx(classes.expand)} variant='outlined' onClick={openNote}>
            open
          </Button>
        </CardActions>
      </Card>
    )
  }
