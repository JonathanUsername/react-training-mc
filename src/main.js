import React from 'react';
import {render} from 'react-dom';
import Layout from './Layout';
import Es6 from './Es6.js';
import Counter, {store} from './redux.js';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Provider as ReduxProvider } from 'react-redux'

// This is our data. We'll pass it into the app at its root,
// but we'd fetch it via Relay or similar in the real world.
const data = {
  name: 'Jon'
};

// We're spreading the data here, so they're like top-level props.
render(
    <ReduxProvider store={store}>
        <Router history={browserHistory}>
            <Route {...data}  path="/" component={Layout}/>
            <Route path="/es6" component={Es6}/>
            <Route path="/redux" component={Counter}/>
        </Router>
    </ReduxProvider>
, document.querySelector('#app'));
