#React Helper
So, you have decided you want add react to your app. There are tons of resources and tools out there to help developers get started with react and start a fresh new react app; however, there
are not many tools out there there to help those who want to add react to an existing app (built with node).  React-helper makes it extremely easy to
add react components to your views, so you can jump right into writing react components without having to worry too much about setup.


##Getting started
Getting started is simple: 
(_For the examples, I will be using showing snippets of code from an express application using handlebars templating engine, but this helper will work with any framework and templating engine_)
* 1. Create a directory where you will be keeping all of your react code (something like "client").  An express app usually looks similar to this:
```javascript
project/
  controllers/
  middlewares/
  models/
  public/
  views/
  client/  //<-- New directory  
```

* 2. Within the client directory you will need to create a file that will register your components with react-helper.  This file will also be your _entry point_ for webpack (more on that later).
That file should live here:
```javascript
  ...
  views/
  client/
    //Other organizational directories for your react code
    components/
    index.js  // <-- New file
```
The file should look something like this:
 ```javascript
const reactHelper = require('reactHelper');
const SomeComponent = require('./path/to/a/component');
//Require all components you want to use in your views...


reactHelper.register({SomeComponent});
// register each of the components you will be using in your views
reactHelper.register({OtherComponent});
 ```
* 3. Then, in your controller (or whatever code renders your view template) all you have to do is call react-helper's "renderComponent", and pass the results to your view:
Controller:
```javascript
const reactHelper = require('react-helper');
const component = reactHelper.renderComponent('SignUp')
res.render('view-to-render', {component})
```

View:
```html
<h1>This view has react in it</h1>
{{{component}}}
```

##Setup
The only setup needed is to add webpack to your project, point it to the react-helper registration file, and include the resulting javascript file in your project.
* 1. The only requirement react-helper has for the webpack config is that the entry point is the file that registers all of the components using react-helper.
In the example above it would look something like this:
```javascript
entry: [
  './client/index.js'
],
```
* 2. Then, assuming your webpack's output looks something like: 
```javascript
output: {
  filename: 'react-bundle.js',
  path: './public/javascript',
},
```
Adding it to your application would look just like adding any other local javascript file.
```html
<script src="public/javascript/react-bundle.js"></script>
```

##Features:
* Passing properties to components: You can now _easily_ pass data from your server to your registered components.
Controller (_example passing results from mongo query to react component_):
```javascript
  db.collection('users').find().toArray(function(err, users) {
    const component = reactHelper.renderComponent('ListUsers', users)
    return res.render('view-to-render', {component})
  }
```
##In progress features:
_I am creating this for use in my own project, so this will be progressing quickly_ 
* Server-side rendering:  Adding a feature to make server side rendering possible with the flip of a switch.
* Webpack management:  To make it even faster for you to plug in this library and hit the ground running with react, I'm going to include some tools to handle webpack 
##Shout out!
This library is inspired by React On Rails (https://github.com/shakacode/react_on_rails), a library that makes it insanely easy to add react to a Rails application. 

##Contributing
Feel free to open issues or pull requests!
