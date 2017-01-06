# ES6

## `var/let/const`

### `const`

Use whenever the variable doesn't get reassigned.

```
const myConstant = { a: 5 };

// Bad
myConstant = { a: 6 };

// Fine
myConstant.a = 6;
```

### `let`

`let` is block scoped. Use it if you want to.

```
if (something) {
    let x = "Hello";
}
console.log(x); // Error: x is not defined

// More useful for something like:

for (let i = 0; i < 10; i++) {
    // ...
}

for (let i = 0; i < 5; i++) {
    // ...
}
```

### `var`

As before. I default to using `var`. Function scoped.

## Template literals

Template strings use the backtick (\`) character and feature interpolation via a dollar and curly braces (`${}`).

They should be favoured over the old-style string concatenation:
```
// Bad
var str = foo + ' ' + bar + '!';

// Good
var str = `${foo} ${bar}!`;
```

You can even evaluate expressions in the interpolated section, casting the output to a string:
```
var numString = `${Math.min(5, 7)}`;
```

### Multi-line
Template literals also allow for multi-line strings. They preserve newlines! Woo!
```
var multi = `
Here's my list:
* Write es6
* Listen to music
* Finish list
`;
```

### Tagged template literals
This is advanced, so you will hopefully never need this, but it explains how the weird Relay.QL sections of our Relay containers work.

One of the more mind-bending parts of this is that you can pass a template into a function without parens:
```
function tag(strings, ...values){
    console.log(strings[0]); // "Hello "
    console.log(values[0]);  // 15
    return 50
}
tag`Hello ${10 + 5}`;
```
I won't go into how Relay.QL works because it's complicated and I don't understand it, but the reason for using tagged template literals there is that it is processed by the `babel-relay-plugin` at transpilation time, matching the expressions up to a (possibly vast) schema that then doesn't have to be included in the application.

```
Relay.QL = function(strings, ...substitutions) {
    //... do some magic
    return new RelayFragmentReference(
      () => fragment
    );
}
var fragment = Relay.QL`
  fragment on User {
    name
  }
`;
```

<h2>Destructuring</h2>

One of the neatest tricks with es6 is destructuring. It allows you to pull properties off an object, maintaining the previous key:
```
var details = {name: 'jon', modesty: null, intelligence: Infinity};
var {name, modesty} = details;
console.log(name): // jon
console.log(modesty): // null
```
Maintaining the previous key means that an object key of an existing variable without a new value, takes the existing variable's value:
```
var person = {fullname: 'Jon King', details};
console.log(person.details) // {name: 'jon', modesty: null, intelligence: Infinity}
```

It can also be done on objects passed into functions, so you can pass large objects in, and destructure only the bits you want:
```
function printName({name}) {
    console.log(name)
}
printName(details); // jon
printName({name: 'stu', status: 'fired'}); // stu
```

This is useful for react, since you can ignore props that aren't relevant:
```
const ReactElement({name}) => <div>{name}</div>;
render(<ReactElement {...props} />);
```
You can also nest destructuring:
```
// this.props = {cloudcast: {owner: {name: 'jon'}}}
var {
    cloudcast: {
        owner: {
            name
        }
    }
} = this.props;
console.log(name); // jon
```
And you can assign default values:
```
function printName({name = 'jon'}) {
    console.log(name)
}
printName({name: 'stu', status: 'fired'}); // stu
printName({}); // jon
```
Or change their names:
```
var o = {p: 42, q: true};
var {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true  
```

And you can even compute the key:
```
var key = "z";
var { [key]: foo } = { z: 'bar', b: 'baz' };

console.log(foo); // bar
```

### Arrays

The same can be done with arrays:
```
var [a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2
```
You can also swap arrays:
```
var a = 1, b = 3;
var [a, b] = [b, a];
console.log(b); // 1
console.log(a); // 3
```
And use rests (...):
```
var [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]
```

## Default / Rest / Spread
As I've already partially explained these ones, it'll be quick.

### Default

Default params (a la Python):
```
function inc(number, increment = 1) {
  return number + increment;
}
console.log(inc(2, 2)); // 4
console.log(inc(2));    // 3
```
Unlike in Python, you won't get a "Named keyword before positional argument (or something)" error
```
function sum(a, b = 2, c) {
  return a + b + c;
}
console.log(sum(1, 5, 10));         // 16 -> b === 5
console.log(sum(1, undefined, 10)); // 13 -> b as default
```
Defaults can also be set via functions, they don't have to be primitives:
```
function getDefaultIncrement() {
  return 1;
}
function inc(number, increment = getDefaultIncrement()) {
  return number + increment;
}
console.log(inc(2, 2)); // 4
console.log(inc(2));    // 3
```

### Rest

Rest in function params will boil all remaining params down to a single array:
```
// Let's make a sum function that takes an indefinite number of params
function sum(...numbers) {
  var result = 0;
  numbers.forEach(num => res += num
    result += number;
  });
  return result;
}
// Or, using arrow functions and reduce:
var sum(...numbers) => numbers.reduce((sum, next) => sum + next);

console.log(sum(1)); // 1
console.log(sum(1, 2, 3, 4, 5)); // 15
```
If there are positional params after this, it obviously throws a wobbly/error:
```
function sum(…numbers, last) { // causes a syntax error
  var result = 0;
  numbers.forEach(function (number) {
    result += number;
  });
  return result;
}
```

### Spread

The spread operator is logically the opposite of the rest operator. It turns arrays into arguments:
```
function sum(a, b, c) {
  return a + b + c;
}
var args = [1, 2, 3];
console.log(sum(…args)); // 6
```

## Modules

### `require`

```
// myModule.js
class X {}

module.exports = {
    myFunction: function() {},
    a: '1',
    X: X    
};
```

```
// otherFile.js
var myModule = require('./myModule');

// myModule is {myFunction: function() {}, a: '1', X: X}
```

### `export/import`

```
// myModule.js
export function myFunction() {}
export var a = '1';
export class X {}
```

```
// otherFile.js
import {myFunction, a, X} from './myModule';
```

### Default

```
// myModule.js
export default function myFunction() {};
```

```
// otherFile
import myFunction from './myModule';
```

### Other examples

```
import MyDefaultExport from './myModule';
import {a, b, c} from '../another';
import d, {a, b, c} from '../another'
import x from 'my-library';
import x from './myFile';
```

## Arrow Functions

Yay! Arrow functions are fantastic. I'm sure you know the basics, that these two are *largely* equivalent:
```
function blah() {}
var blah = () => {};
```
Together with map/reduce it means you can turn complex operations into a few lines of code:
```
var people = [{
    name: 'jon',
    job: 'code-monkey',
    intelligence: Infinity
}, {
    name: 'trump',
    job: 'politician',
    intelligence: -10
}, {
    name: 'BoJo',
    job: 'politician',
    intelligence: 0
}];
var likelyhoodOfSurvival =
    people
        .filter(i => i.job === 'politician')
        .map(i => i.intelligence)
        .reduce((sum, i) => sum + i);
```

### Binding of this

Previously, binding the `this` keyword was a bugger. You would either have to manually bind it with `.bind(this)` or assign `this` to a new value:
```
function Person() {
  var that = this;
  that.age = 0;

  setInterval(function() {
    that.age++;
  }, 1000);
}
```

Arrow functions, however, are implicitly bound:
```
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++;
  }, 1000);
}
```

However, they do not bind in objects, so don't use them for object methods:
```
'use strict';
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b(); // prints undefined, Window
obj.c(); // prints 10, Object {...}
```

### Click handlers in react

The implicit binding has another, further feature which is very useful. This is technically not part of es6, but it is covered by the babel transpiler and is damn useful, so it's likely to stay. Within classes, you can declare arrow functions as properties of the class to bind them implicitly, like so:
```
class Button extends React.Component {
  handleClick = () => {
    console.log('clickity');
  }

  render() {
    return (
      <button onClick={this.handleClick}/>
    );
  }
}
```
This means you don't have to .bind them in the constructor or other such nonsense.

### Returning:

You can return implicitly
```
var func = x => x + x;
```
or explicitly
```
var func = x => { return x + x };
```
or an object
```
var func = () => ({foo: 'bar'});
```
which you can use for returning nested react components concisely:
```
var Component = props => (
    <div>
        <Button {...props}>
            Click me!
        </Button>
    </div>
);
```

## Classes

### Functions

```
class Animal {
    constructor(name) {
        this.name = name
    }

    changeDetails(name) {
        this.name = name;
    }
}

var a = new Animal('Fido');
```

is equivalent to:

```
function Animal(name) {
    this.name = name;
}

Animal.prototype.changeDetails = function(name) {
    this.name = name;
};

var a = new Animal('Fido');
```

### Inheritance

```
class Animal {
    constructor(name) {
        this.name = name;
    }

    changeDetails(name) {
        this.name = name;
    }
}

class Dog extends Animal {
    constructor(name, age) {
        super(name);
        this.age = age;
    }

    changeDetails(name, age) {
        super.changeDetails(name);
        this.age = age;
    }

    bark() {
        console.log('bark');
    }
}
```

### Constructor

```
class Animal {
    name = 'Rex';
    age = 5;
}
```

is equivalent to:

```
class Animal {
    constructor() {
        this.name = 'Rex';
        this.age = 5;
    }
}
```

This is also possible:

```
class Animal {
    age = 5;
    ageTimesTwo = this.age * 2;
}
```

### Methods

```
class Dog extends Animal {
    // Method
    bark(whatToBark) {
        // ...
    }
}

var d = new Dog();
d.bark('rerro');
```

### Static

```
class Animal {
    // Static - i.e. Animal.animalType === 'dog'
    static animalType = 'dog';

    // Using a static property
    getType() {
        return this.constructor.animalType;
    }
}
```

### Properties

```
class Animal {
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
}

var a = new Animal();
a.age = 5;
a.age === 5;
```

## Enhanced Object Literals

```
var a = 5;

var obj = {
    a,
    toString() {
        return this.a.toString();
    },
    ['_' + a]: 6
};
```

is equivalent to:

```
var a = 5;

var obj = {
    a: a,
    toString: function() {
        return this.a.toString();
    }
};
obj['_' + a] = 6;
```

## Maps and Sets

```
// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
// Because the added object has no other references, it will not be held in the set
```

## Promises

Basic usage:
```
function getFromApi(){
    return new Promise((resolve, reject) => {
        fetch('www.jonny.net')
            .then(res => res.json())
            .then(res => res.ok ? resolve(res) : reject(res.errors))
            .catch(e => reject(e)); // Remember to use catch or JSON parsing errors won't be caught here!
    })
}
```

Gotchas:
```
// Throwing an error will call the catch method most of the time
var p1 = new Promise(function(resolve, reject) {
  throw 'Uh-oh!';
});

p1.catch(function(e) {
  console.log(e); // "Uh-oh!"
});

// Errors thrown inside asynchronous functions will act like uncaught errors
var p2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    throw 'Uncaught Exception!';
  }, 1000);
});

p2.catch(function(e) {
  console.log(e); // This is never called
});

// Errors thrown after resolve is called will be silenced
var p3 = new Promise(function(resolve, reject) {
  resolve();
  throw 'Silenced Exception!';
});

p3.catch(function(e) {
   console.log(e); // This is never called
});
```
