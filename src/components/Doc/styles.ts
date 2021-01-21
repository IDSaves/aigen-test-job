import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
    container: {
        width: '100%',
        borderColor: green[100],
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '.5rem',
        marginBottom: '1rem',
        cursor: 'pointer'
    },
    header: {
        backgroundColor: green[100],
        padding: '1rem'
    }
}))