import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

/**
 * Simple snackbar that is triggered by setting a 'message' state variable in parent component.
 * Clear the 'message' state from the parent to close the snackbar. (use setMessage)
 * @param {String} message the message to be displayed in snackbar
 * @param {function} setMessage the setter for the 'message'. use it to clear the message to close the snackbar
 */
export default function SimpleSnackbar({ message, setMessage }) {
  const [open, setOpen] = React.useState(true)

  const handleClose = (event, reason) => {
    setMessage(null)
    setOpen(false)
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )
}