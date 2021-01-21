import Box from '@material-ui/core/Box'
import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { State } from 'store'
import Doc from 'components/Doc'
import Grid from '@material-ui/core/Grid'
import { Pagination } from '@material-ui/lab'

export default ({docsPerPage, page, setPage}: {docsPerPage: number, page: number, setPage: (n: number) => void}) => {
    const {docs, loading, fullCount} = useSelector((state: State) => ({
        docs: state.app.docs,
        fullCount: state.app.fullCount,
        loading: state.app.loading
    }), shallowEqual)

    return (
        <Grid item xs={12} sm={8} style={{padding: '0rem 1rem'}}>
            {docs.map((d, i) => (
                <Doc key={i} doc={d}/>
            ))}

            <Pagination 
                disabled={loading}
                page={page}
                onChange={(e, v) => setPage(v)}
                count={Math.ceil(fullCount / docsPerPage)} />
        </Grid>
    ) 
}