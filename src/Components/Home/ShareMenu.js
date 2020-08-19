import React from 'react'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'

const options = [
    'Copy to clipboard'
  ]
  
export default function ShareMenu({ copyToClipboard, openSnackbar }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (option) => {
  console.log(option)

  switch(option) {
    case 'Copy to clipboard':
      copyToClipboard()
      openSnackbar('Copied to clipboard')
      break
    default:
      openSnackbar('Please select a valid option')
  }

  setAnchorEl(null)
  }

  return (
    <div>
    <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ShareIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
      
        {
          options.map((option) => (
          
          <MenuItem key={option} onClick={()=>handleSelect(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}