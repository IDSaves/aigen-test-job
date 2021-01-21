import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from 'store'
import Menu from './menu'
import List from './list'

export default () => {
    const [page, setPage] = useState(1)
    const docsPerPage = 5

    return (
        <Container maxWidth="xl">

            <Grid container>
                <Menu docsPerPage={docsPerPage} page={page} setPage={setPage} />
                <List docsPerPage={docsPerPage} page={page} setPage={setPage} />
            </Grid>

        </Container>
    )
}