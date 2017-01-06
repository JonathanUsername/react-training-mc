import React from 'react';
import { connect } from 'react-redux';
import { createStore, bindActionCreators } from 'redux';
import source from '!!raw-loader!./redux.js';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

const counter = (state = {count: 0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, count: state.count + 1}
    case 'DECREMENT':
      return {...state, count: state.count - 1}
    default:
      return state
  }
};

// We could call actions with

export const store = createStore(counter);

// Must be wrapped in a provider to provide the store via context like so:
/*
<ReduxProvider store={store}>
    <Counter />
</ReduxProvider>
*/

const Counter = props => (
    <div>
        <div>
          Clicked: {props.count} times
          {' '}
          <button onClick={props.actions.increment}>
            +
          </button>
          {' '}
          <button onClick={props.actions.decrement}>
            -
          </button>
        </div>
        <div>
            Current state: {JSON.stringify(props.state, null, 2)}
            <SyntaxHighlighter style={docco} language='javascript'>
              {source}
            </SyntaxHighlighter>
        </div>
    </div>
);

// Pull the pertininent parts out of state and into props. This means we don't re-render unless that part of the state changes:
const mapStateToProps = state => ({count: state.count, state});

// Action creators are a bit stranger:
const increment = () => ({type: 'INCREMENT'})
const decrement = () => ({type: 'DECREMENT'})
// They could include data or more, but these are simple, and just have a type string that the reducer's switch case looks out for.

// We can bind that function to dispatch so that it is passed into dispatch when created.
var boundIncrement = () => store.dispatch(increment());
// We could then use that bound function directly to effect a change on the store:

// But a nicer pattern is to use the helper function, bindActionCreators, to pre-bind actions to dispatch:
function nicerDispatchBinding(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

// So here we can use that to bind and add the pertinent actions to props using a one-liner:
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({increment, decrement}, dispatch) });
// This will add an {actions} object to props with increment and decrement bound to dispatch.

// Without this we would need to do something like this to call actions:
// <button onClick={() => store.dispatch({ type: 'DECREMENT' })} />
// And pass access to the store around - nasty.

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);
