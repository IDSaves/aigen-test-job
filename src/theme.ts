import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
        text: {
            primary: '#5F5F5F',
            secondary: '#afafaf'
        },
        primary: {
            main: '#F96167',
        },
        secondary: {
            main: '#F5F4F2',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    }
})

export default theme