import React from 'react'

import '../../common.css'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

/**
 * Dialog box to confirm delete
 * @param {object} props Component props
 * @param {function} onDelete function to make API call and delete the note
 */
export default function AlertDialog({ onDelete }) {
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = () => {
    onDelete()
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this note?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
