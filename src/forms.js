import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createStore, bindActionCreators, combineReducers } from 'redux';
import source from '!!raw-loader!./forms.js';
import { Provider as ReduxProvider } from 'react-redux'
import { Field, reduxForm, reducer as formReducer } from 'redux-form'

const reducers = {
  // ... your other reducers here ...
  form: formReducer     // <---- Mounted at 'form'
}
// This allows us to have multiple reducers
const reducer = combineReducers(reducers)
const store = createStore(reducer)


// Here is our component, it has state.
class ContactForm extends Component {
    state = {response: null};

    mySubmitHandler = (values) => {
      // Do something with the form values
      this.setState({response: values});
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.mySubmitHandler)}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <Field name="firstName" component="input" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" component="input" type="text"/>
                    </div>
                    <div>
                        <Field name="comment" label={'Comment'} component={fieldWithValidationErrors} type="text"/>
                    </div>
                    <button disabled={pristine || submitting} type="submit">Submit</button>
                </form>
                <div>
                    {this.state.response && `Request: ${JSON.stringify(this.state.response)}`}
                </div>
                <pre>
                    {JSON.stringify(this.props.formState, null, 4)}
                </pre>
                <pre>
                    <code className="language-javascript">
                      {source}
                    </code>
                </pre>
            </div>
        );
    }
}

const fieldWithValidationErrors = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

const validate = values => {
  const errors = {}
  if (!values.comment) {
    errors.comment = 'Required'
  } else if (/shit|fuck/.test(values.comment)){
    errors.comment = 'NO SWEARING!'
  }
  return errors
}

const asyncValidate = (values) => {
  return new Promise(resolve => setTimeout(resolve, 1000)) // simulate server latency
    .then(() => {
      if (/jon/.test(values.comment)) {
        throw { comment: 'Speak of the devil...' }
      }
    })
}

// Finally, the connect helper function allows us to use those 2 useful functions to wrap our component with, reassigning to the Counter variable
ContactForm = reduxForm({
    form: 'contact', // a unique name for this form
    validate, // pass validation function
    asyncValidate, // pass an async validation function
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
