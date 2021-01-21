import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import App from './app'
import React from 'react'

const Application = () => (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>
)

ReactDOM.render(<Application />, document.getElementById('app'))