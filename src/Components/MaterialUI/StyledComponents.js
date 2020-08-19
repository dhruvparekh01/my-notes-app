import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      margin: '10px 30%',
    },
    label: {
      textTransform: 'capitalize',
    },
})(Button)

const StyledButtonOutlined = withStyles({
    root: {
      borderRadius: 3,
      border: 0,
      color: 'red',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      margin: '10px 30%',
    },
    label: {
      textTransform: 'capitalize',
    },
})(Button)



export {StyledButton, StyledButtonOutlined}
