import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import Router from './router'
import Header from 'components/Header'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import createStyles from '@material-ui/core/styles/createStyles'

const useStyles = makeStyles(() =>
    createStyles({
        '@global': {
            '*#app': {
                overflowX: 'hidden',
                minHieght: '100vh'
            }
        }
    })
)

export default () => {
    const css = useStyles()
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Router />
        </ThemeProvider>
    )
}