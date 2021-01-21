import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { AppStore, State } from 'store'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Actions from 'actions'
import LinearProgress from '@material-ui/core/LinearProgress'

export default ({docsPerPage, page, setPage}: {docsPerPage: number, page: number, setPage: (n: number) => void}) => {
    const loading = useSelector((state: State) => state.app.loading, shallowEqual)
    const [state, setState] = useState<{
        title?: string,
        id?: string,
        dt_create_start?: string,
        dt_create_end?: string,
        sort_by?: 'id' | 'dt_create'
        sort_type: 'asc' | 'desc'
    }>({
        title: undefined,
        id: undefined,
        dt_create_start: undefined,
        dt_create_end: undefined,
        sort_by: undefined,
        sort_type: 'asc'
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log(state)
            Actions.getDocs({
                page_number: page,
                page_size: docsPerPage,
                ...state,
                id: Number(state.id)
            })
        }, 250)
        return () => {
            clearTimeout(timeout)
        }
    }, [page, JSON.stringify(state)])

    const handleChange = (type: 'title' | 'id' | 'dt_create_start' | 'dt_create_end' | 'sort_by' | 'sort_type', value: string | number | 'id' | 'dt_create' | 'asc' | 'desc') => {
        setState({
            ...state, 
            [type]: value
        })
        setPage(1)
    }

    return (
        <Grid item xs={12} sm={4}>
            <TextField
                type="number"
                fullWidth
                variant="outlined"
                label="ID документа"
                size="small"
                helperText="Если заполнено поле ID документа, то все остальные поля игнорируются"
                value={state.id}
                onChange={(e) => handleChange('id', e.target.value)}
            />

            <Grid container spacing={4} style={{marginTop: '.1rem'}}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="date"
                        label="Создан (начало)"
                        type="date"
                        size="small"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={state.dt_create_start}
                        onChange={(e) => handleChange('dt_create_start', e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="date"
                        label="Создан (конец)"
                        type="date"
                        size="small"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={state.dt_create_end}
                        onChange={(e) => handleChange('dt_create_end', e.target.value)}
                    />
                </Grid>
            </Grid>

            <TextField
                style={{marginTop: '1rem'}}
                fullWidth
                size="small"
                variant="outlined"
                label="Название документа"
                value={state.title}
                onChange={(e) => handleChange('title', e.target.value)}
            />

            <Grid container spacing={4} style={{marginTop: '.1rem'}}>
                <Grid item xs={6}>
                    <InputLabel id="sort-label">Сортировка</InputLabel>
                    <Select
                        labelId="sort-label"
                        fullWidth
                        value={state.sort_by}
                        onChange={(e) => handleChange('sort_by', e.target.value as string)}>
                        <MenuItem value="">
                            <em>Выбрать</em>
                        </MenuItem>
                        <MenuItem value="dt_create">По дате</MenuItem>
                        <MenuItem value="id">По id</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel id="sort-label-type">Тип сортировка</InputLabel>
                    <Select
                        labelId="sort-label-type"
                        value={state.sort_type}
                        onChange={(e) => handleChange('sort_type', e.target.value as string)}
                        fullWidth>
                        <MenuItem value="asc">По возрастанию</MenuItem>
                        <MenuItem value="desc">По убыванию</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            {loading ? <LinearProgress style={{marginTop: '1rem'}} /> : ''}
        </Grid>
    )
}