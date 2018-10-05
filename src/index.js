import React from 'react'
import ReactDOM from 'react-dom'
import './assets/medium.css'
import './assets/custom.css'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import App from './App.js'
import registerServiceWorker from './registerServiceWorker'
import { store, history } from './redux/store'
import { getUser } from './redux/actions/actions'


if(localStorage.Auth) {
    // update localstorage
    var authJSON = JSON.parse(localStorage.Auth)
    store.dispatch({type: 'SET_USER', user: authJSON})
    if (authJSON) {
        var id = JSON.parse(localStorage.Auth)._id
        getUser(id).then((res) => {
            store.dispatch({type: 'SET_USER', user: res})
        })
    }
}


ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
