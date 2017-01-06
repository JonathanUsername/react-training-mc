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
