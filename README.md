# React Workshop 


## Run


    python -m SimpleHTTPServer 8081

    brew install kidoman/tools/serve
    go get kidoman/tools/serve
    serve


## Agenda

### Day 1

#### Setup

Install `node`

    brew install node

Install `jspm`

    npm install -g jspm

Use this HTML base template.

    http://tinyurl.com/react-base-html

#### React Overview

React advocates component based programming, i.e. writing small, reusable, 
loosely coupled components (the principle of the 'separation of concern').

Each change triggers entire application re-render.

Component composition « equals to » function composition.

React supports many ES6 features e.g. classes

ES6 can be compiled to ES5 using Babel.

[The problem with Angular][7]

* peculiar coding style
* its emulation of an HTML templating system that belongs on the server instead of in the browser, 
* its serious and fundamental performance issues.

[Why you should not use AngularJS][8]



#### React 0 

React library and related are served from a CDN for simplicity.

We use `text/babel` script `type` to start with ES6 right away.

`render` returns a tree of React components that will eventually 
render to HTML.

`<p>` is not actual DOM nodes, it's an instantiation of a React `div` 
component. Thus, [XSS][1] protection is the default.

`ReactDOM.render()` instantiates the root component, starts the 
framework, and injects the markup into a raw DOM element, provided as 
the second argument

1. Change font color

#### React 1

JSX is a JavaScript syntax extension that looks similar to XML.

JSX is a syntactic sugar over function invocation.

It is a concise and familiar syntax (designers) for defining tree 
structures with attributes.

The JSX compiler will automatically rewrite HTML tags to 
`React.createElement(tagName)`.

#### React 2

A component can depend on data passed in from its parent. This data is 
available as a 'property' on the child component and it is accessed 
through `this.props`.

By surrounding a JavaScript expression in curly braces `{}` inside JSX, 
you can drop text or React components into the tree. 

We access named attributes passed to the component as keys on `this.props` 
and any nested elements as `this.props.children`.

1. Remove `<div>` from content 
2. Play with spread attributes i.e. {...props}

#### React 3

To implement interactions, we introduce mutable state to the component.

State is being set in `constructor()`.

`this.state` is private to the component and can be changed by calling 
`this.setState()`.

An event can modify state leading to application re-render.

Ideally, there shouldn't be a component state.

`render()` methods are written declaratively as functions of `this.props` 
and `this.state`. 

1. why it doesn't work ?
2. add on hover event that changes something

`React.createClass` has a built-in magic feature that bound all methods 
to `this` automatically for you, but it's not built-in into React's class 
model. You can explicitly prebind methods in your constructor. 

Methods follow the same semantics as regular ES6 classes, i.e. they don't 
automatically bind `this` to the instance. You'll have to explicitly use 
`.bind(this)` or arrow functions `=>`.

Be aware that binding a function creates a new function. You can either 
bind it directly in `render()`, which means a new function will be 
created **every time** the component renders, or bind it in your 
constructor, which will only fire once.

    constructor() {
      this.changeContent = this.changeContent.bind(this);
    }

vs

    render() {
      return <input onChange={this.changeContent.bind(this)} />;
    }


#### React 4

Input field is linked to the application state.

#### React 5

We use a JSON file as a database.

`componentDidMount()` is a method called automatically by React when a component is rendered. 

We use the `ref` attribute to assign a name to a child component and 
`this.refs` to reference the DOM node.

1. Try to replace `refs` with state for the form
2. Try to implement a proper backend so POSTing works

#### React 6

Let's use [Browserify][2]. 

Browserify lets you `require('modules')` in the browser by bundling up 
all of your dependencies.

There is an *optimistic adding* for comments.


#### React 7

[JSPM][3] is (another) JavaScript Package Manager. It uses [SystemJS][4], 
an universal module loader for JavaScript: it can load [CommonJS modules][5], 
[AMD][6]
and globals. It can also translate from ES6 to ES5, i.e. we don't need another
tool for that.

    npm init

We will use universal `package.json` to store dependencies.

`config.js` is an configuration file that JSPM maintains.

// How to put it somewhere else

Let's check `Network` tab to see what's being fetch by JSPM.

Browser's `fetch` API.

Install 1st module

    jspm install fetch=npm:whatwg-fetch

Polyfills as global (check `Network` tab)

    import 'fetch'

`debugger` allows for debugging on the un-transpiled code.

#### React 8

The only way to mutate the state is to emit an action, an object describing 
what happened.

Reducers are just pure functions that take the previous state and an action, 
and return the next state. 

Actions are payloads of information that send data from your application to 
your store (only source of information for the store). You send them to the 
store using `store.dispatch()`.

Only top-level components (e.g. route handlers) should be aware of Redux. 

`connect()` function provided by react-redux turns a *dumb* `Counter` into a 
*smart* component. It does not modify the passed React component, it returns a 
new, connected component.

#### React 9

1. Add a todo item removal.
2. Mark as incomplete.
3. Implement a server side data store.


[1]: https://en.wikipedia.org/wiki/Cross-site_scripting
[2]: http://browserify.org/
[3]: http://jspm.io/
[4]: https://github.com/systemjs/systemjs
[5]: http://spinejs.com/docs/commonjs
[6]: https://en.wikipedia.org/wiki/Asynchronous_module_definition
[7]: http://www.quirksmode.org/blog/archives/2015/01/the_problem_wit.html
[8]: https://medium.com/@mnemon1ck/why-you-should-not-use-angularjs-1df5ddf6fc99
[9]: https://github.com/happypoulp/redux-tutorial
[10]: https://blog.andyet.com/2015/08/06/what-the-flux-lets-redux