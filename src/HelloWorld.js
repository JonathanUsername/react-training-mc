// PART0

import React from 'react';

// This is our base component.
// It is functional and stateless.
export var HelloWorld = function(props) {
  return (
    <h1 {...props}>
      Hello {props.name}!
    </h1>
  );
}

// It can also be written as an arrow function
var HelloWorldArrow = props => <h1 {...props}> Hello {props.name}! </h1>;

// PART1

// This is a simple Higher Order Component. It is coupled to its child, and only adds one prop
export var RedHello = function(props) {
  return <HelloWorld style={{color: 'red'}} {...props} />;
}

// PART2

// Here is a long-form HOC which can be applied to any component.
// It functions much like a decorator:
function SecretNameDecorator(Component) {
  return function(props) {
    const newProps = {
      ...props,
      name: props.name + '-boy'
    };
    return <Component {...newProps} />;
  }
}
// Save the wrapped Components
export const SecretRedHello = SecretNameDecorator(RedHello);

// PART3

// Here is one that looks simpler, and takes advantage of es6 arrow functions:
const Timmifier = Component => props => <Component {...props} name="Tim" />;

// Save the wrapped Components
export const TimHello = Timmifier(RedHello);

// PART4

// // Here is one that wraps the component in another component:
const Codifier = Component => props => <pre><Component {...props} /></pre>;

// // Save the wrapped Components
export const CodeHello = Codifier(HelloWorld);

// PART5
