import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import React from "react"
import styles from './styles'

export default () => {
    const css = styles()
    
    return (
        <Container maxWidth="xl" className={css.container}>
            <Box style={{padding: '.5rem 0'}} display="flex" justifyContent="flex-start" alignItems="center">
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" style={{color: 'white'}}>
                        Поиск документов
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}