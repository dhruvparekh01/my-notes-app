import React from 'react'
import {useHistory} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { ListSubheader } from '@material-ui/core'
import NoteIcon from '@material-ui/icons/Note'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  selected: {
    background: '#DCDCDC',
  }
}))

export default function SideBar({curNote, notes}) {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <div className='sidebarContent'>
        <List component="nav" aria-label="main mailbox folders" style={{maxHeight: '20em', overflow: 'auto'}}>
          <ListSubheader>All Notes</ListSubheader>

          {/* Show a list of the avaliable notes. */}
          {/* The class of the item should be 'selected' if it is the current note that the user is looking at. */}
          {notes.map((note, i) => (
            <ListItem button key={i} onClick={()=>history.push(`/note/${note._id}`)} className={(note._id===curNote._id) ? classes.selected : ''}>
                <ListItemIcon>
                  <NoteIcon />
                </ListItemIcon>
                <ListItemText primary={note.title} />
                {/* Show a favorite icon if the note has been added to favorite */}
                {(note.liked) ? <FavoriteIcon color="secondary"/> : null}
            </ListItem> 
        ))}
        </List>
      </div>
    </div>
  )
}

