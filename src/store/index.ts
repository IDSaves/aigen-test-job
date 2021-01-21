import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { bindActionCreators } from 'redux'

import app from './app'
import { AppState } from './app'
 
const store = configureStore({
    reducer: {
        app: app.reducer,
    },
    middleware: [...getDefaultMiddleware({immutableCheck: false, serializableCheck: false})],
    devTools: {
        name: 'AigenTest',
        actionCreators: {
            ...app.actions
        },
        trace: true
    }
})

export interface State {
    app: AppState
}

export const AppStore = bindActionCreators(app.actions, store.dispatch)

export default store