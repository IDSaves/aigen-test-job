import { Route, Switch } from 'react-router-dom'
import * as Pages from './pages'
import React from 'react'

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={Pages.Home} />
            <Route component={Pages.Error} />
        </Switch>
    )
}

export default AppRouter