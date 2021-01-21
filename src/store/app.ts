import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { doc } from 'definitions'
import { findIndex } from 'lodash'

export interface AppState {
    docs: doc[]
    fullCount: number
    loading: boolean
}

export let initialState: AppState = {
    docs: [],
    fullCount: 0,
    loading: false
}


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },

        setDocs(state, action: PayloadAction<{data: doc[], fullCount: number}>) {
            state.docs = action.payload.data
            state.fullCount = action.payload.fullCount
            state.loading = false
        },

        clearDocs(state) {
            state.docs = []
        },

        clear: () => initialState
    }
})

export default appSlice