import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { doc } from 'definitions'
import React, { useState } from 'react'
import styles from './styles'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import moment from 'moment'

export default ({doc}: {doc: doc}) => {
    const [opened, setOpened]= useState(false)
    const css = styles()

    const handleClick = () => {
        const startDate = moment('2021-01-22', 'YYYY-MM-DD')
        const endDate = moment('2021-01-24', 'YYYY-MM-DD')
        console.log(moment(doc.dt_create, 'DD.MM.YYYY'))
        console.log(moment(doc.dt_create, 'DD.MM.YYYY').isBetween(startDate, endDate, undefined, '[]'))
        setOpened(!opened)
    }

    return (
        <Box className={css.container} onClick={handleClick} >
            <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                className={css.header}
                style={{
                    borderTopLeftRadius: '.5rem',
                    borderTopRightRadius: '.5rem',
                    borderBottomLeftRadius: !opened ? '.5rem': undefined,
                    borderBottomRightRadius: !opened ? '.5rem': undefined
                }} >
                <Typography>{doc.title}</Typography>
                <KeyboardArrowDownIcon fontSize="large" />
            </Box>

            {opened ? (
                <Box padding="1rem">
                    <Typography variant="h5">
                        {doc.body}
                    </Typography>
                </Box>
            ) : ''}
        </Box>
    )
}