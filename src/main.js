import React, {Component} from 'react';
import {render} from 'react-dom';
import AboutReact from './aboutReact';
import Es6 from './Es6.js';
import Redux from './redux.js';
import Form from './forms.js';
import { Router, Route, Link, browserHistory } from 'react-router'

class App extends Component {
    render(){
        return (
            <div>
                {this.props.router.location.pathname === '/' &&
                    <div style={{
                        height: '100%',
                        padding: 0,
                        margin: 0,
                        display: '-webkit-box',
                        display: '-moz-box',
                        display: '-ms-flexbox',
                        display: '-webkit-flex',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <h1>
                            <img style={{height: 30, display: 'inline'}} src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/lightning-icon.png"/>
                            React Lightning Talks
                            <img style={{height: 30, display: 'inline'}} src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/lightning-icon.png"/>
                        </h1>
                        <div style={{marginTop: 50}}>
                            <img src="http://www.allenpike.com/images/2015/cube-drone-angular.jpg" />
                        </div>
                    </div>
                }
                <ul style={{position: 'fixed', right: 0, top: 0, padding: 20}}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/react">React</Link>
                    </li>
                    <li>
                        <Link to="/es6">ES6</Link>
                    </li>
                    <li>
                        <Link to="/redux">Redux</Link>
                    </li>
                    <li>
                        <Link to="/forms">Forms</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
};

const reHighlight = ComposedComponent => class extends Component {
    componentDidMount() {
        Prism.highlightAll();
    }
    render() {
        return <ComposedComponent {...this.props} />;
    }
}

// This is our data. We'll pass it into the app at its root,
// but we'd fetch it via Relay or similar in the real world.
const data = {
  name: 'Jon'
};

// We're spreading the data here, so they're like top-level props.
render(
    <Router history={browserHistory}>
        <Route {...data} path="/" component={App}>
            <Route {...data} path="/react" component={reHighlight(AboutReact)}/>
            <Route {...data} path="/es6" component={reHighlight(Es6)}/>
            <Route {...data} path="/redux" component={reHighlight(Redux)}/>
            <Route {...data} path="/forms" component={reHighlight(Form)}/>
            <Route {...data} path="*" component={() => <div>404 NOPE!</div>}/>
        </Route>
    </Router>
, document.querySelector('#app'));
