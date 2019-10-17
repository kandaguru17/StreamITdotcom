import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamShow from './streams/StreamShow'
import StreamList from './streams/StreamList'
import Header from './Header'


export default class App extends Component {
    render() {
        return (
            <div className="ui container">
            {/* nav bar component */}
                <Header />

                <Switch>
                    <Route path='/' exact component={ StreamList } />
                    <Route path='/streams/new' exact component={ StreamCreate } />
                    <Route path='/streams/edit/:id' exact component={ StreamEdit } />
                    <Route path='/streams/delete/:id' exact component={ StreamDelete } />
                    <Route path='/streams/:id' exact component={ StreamShow } />
                    <Route render={ () => <h1>404 not found</h1> } />
                </Switch>
            </div>
        )
    }
}
