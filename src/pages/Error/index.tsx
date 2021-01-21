import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'
import React from 'react'

export default () => {
    return (
        <Container maxWidth="xl">
            <Alert severity="error">
                Страница не найдена :(
            </Alert>
        </Container>
    )
}