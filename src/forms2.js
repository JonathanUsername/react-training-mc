import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createStore, bindActionCreators, combineReducers } from 'redux';
import source from '!!raw-loader!./forms.js';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';
import { Provider as ReduxProvider } from 'react-redux'
import { Field, reduxForm, reducer as formReducer } from 'redux-form'

const reducers = {
  // ... your other reducers here ...
  form: formReducer     // <---- Mounted at 'form'
}
// This allows us to have multiple reducers
const reducer = combineReducers(reducers)
const store = createStore(reducer)


// Here is our component. It is a functional, stateless component, just changing according to its props (and this page's source code, but ignore those shenanigans)

class ContactForm extends Component {
    handleSubmit = (values) => {
      // Do something with the form values
      console.log(values);
    }
    render() {
        const { handleSubmit, pristing, submitting } = this.props;
        return (
            <div>
                <div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <Field name="firstName" component="input" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" component="input" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" component="input" type="email"/>
                    </div>
                    <button disabled={pristine || submitting} type="submit">Submit</button>
                </form>
                <pre>
                    {JSON.stringify(this.props.formState, null, 4)}
                </pre>
            </div>
        );
    }
}

// Finally, the connect helper function allows us to use those 2 useful functions to wrap our component with, reassigning to the Counter variable
ContactForm = reduxForm({
    form: 'contact' // a unique name for this form
})(ContactForm);

// Let's pull out the state, too, so we can see what's going on:
ContactForm = connect(
    ({form}) => ({formState: form})
)(ContactForm)

// Finally, in order to supply the store as context, we need to wrap our component in a Provider:
var ReduxContainer = () => (
    <ReduxProvider store={store}>
        <ContactForm />
    </ReduxProvider>
);

export default ReduxContainer;
