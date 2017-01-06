# React

## Why use React?
React Native
Skills
Speed

## Basic Concepts

Your view is a function of your data.

> C = f(d)

Your component is a function of its props.


```
// Which can be implemented, using JSX, as:
const Component = function(data) {
	return <div>Hello {data.name}!</div>;
}
```
```
// Or, more succinctly, using arrow functions:
const Component = data => <div>Hello {data.name}!</div>;
```

## Higher Order Components

A Higher Order *Function* is one that returns a new function:
```
const wrapInputInStars = function(func) {
	return function(data) {
		return func('*' + data + '*');
	}
}
const upperString = function(str) {
	return str.toUpperCase();
}
const importantify = wrapInputInStars(upperString);
importantify('jon'); // "*JON*"
```
```
// Or, more succinctly, using arrow functions:
const wrapInputInStars = func => data => func('*' + data + '*');
const upperString = str => str.toUpperCase();
const importantify = wrapInputInStars(upperString);
importantify('jon'); // "*JON*"
```

A Higher Order *Component* is one that returns a new component:

> H = F(C)
> H = F(f(d))



```
// So we can add props to our component:
const HigherOrderComponent = function(Component) {
	return <Component className="extra-big">;
}
```
```
// Or add methods/variables that it depends on:
const HigherOrderComponent = function(Component) {
	const fullname = name => `Your Majesty, ${name}`;
	return Component;
}
const Component = function(data) {
	return <div>Hello {fullname(data.name)}!</div>;
};
```
