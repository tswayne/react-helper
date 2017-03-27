# React Helper
### Easily add react to your pre-existing node application
There are tons of resources and tools out there to help developers get started with react and start a fresh new react app; however, there
are not many tools out there there to help those who want to add react to an existing app (built with node).  React-helper makes it extremely easy to
add react components to your views, so you can jump right into writing react components without having to worry too much about setup.

## Features:
* Extremely easy to add react components to your views

  **Controller**:
      
   ```javascript
   const reactHelper = require('react-helper');
   const component = reactHelper.renderComponent('SignUp')
   res.render('view-to-render', {component})
   ```

  **View**: _example using handlebars templating engine_
      
   ```html
   <h1>This view has react in it</h1>
   {{{component}}}
   ```
* Pass server-side data to components: You can now _easily_ pass data from your server to your react components.

  **Controller**: _example passing results from mongo query to react component_
      
   ```javascript
   db.collection('users').find().toArray(function(err, users) {
     const component = reactHelper.renderComponent('ListUsers', users)
     return res.render('view-to-render', {component})
   }
   ```
      
* Server-side rendering: use the full power of react by server-side rendering your components by just passing the react component (or its relative path) to react helper instead of a string.

   **Controller**: _example passing results from mongo query to react component_
   
   ```javascript
   const reactHelper = require('react-helper');
   const SignUp = require('../path/to/SignUp');
   const component = reactHelper.renderComponent(SignUp) //IT'S THIS EASY
   res.render('view-to-render', {component})      
   ```

## Getting started
### CLI
   You can now add react-helper to your app with one command!
   
   1. `npm install react-helpr -G`
   2. react-helper init [options]
   
   *react-helper init options:*
     -h, --help                      output usage information
     -p, --bundle-path <bundlePath>  Bundle path
     -n, --bundle-name <bundleName>  Bundle name
     -c, --client-dir <clientDir>    React app directory
     -w, --webpack                   Add webpack and generate config
   
### Manually add react-helper to your application
   Getting started is simple: 

   _For the examples, I will be using showing snippets of code from an express application using handlebars templating engine, but this helper will work with any framework and templating engine_

   1. Create a directory where you will be keeping all of your react code (something like "client").  An express app usually looks similar to this:
   ```javascript
   project/
     controllers/
     middlewares/
     models/
     public/
     views/
     client/  //<-- New directory  
   ```

   2. Within the client directory you will need to create a file that will register your components with react-helper.  This file will also be your _entry point_ for webpack (more on that later).


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
   // Require all components you want to use in your views...


   reactHelper.register({SomeComponent});
   // Register each of the components you will be using in your views
   reactHelper.register({OtherComponent});
   ```
   3. Then, in your controller (or whatever code renders your view template) all you have to do is call react-helper's "renderComponent", and pass the results to your view:
   
   **Controller**:
   ```javascript
   const reactHelper = require('react-helper');
   const component = reactHelper.renderComponent('SignUp')
   res.render('view-to-render', {component})
   ```

   **View**:
   ```html
   <h1>This view has react in it</h1>
   {{{component}}}
   ```

## Setup
   The only setup needed is to add webpack to your project, point it to the react-helper registration file, and include the resulting javascript file in your project.

   1. The only requirement react-helper has for the webpack config is that the entry point is the file that registers all of the components using react-helper.

   In the example above it would look something like this:
   ```javascript
   entry: [
     './client/index.js'
   ],
   ```

   2. Then, assuming your webpack's output looks something like: 

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

## Server side rendering
   Server-side rendering can be very [useful](https://www.smashingmagazine.com/2016/03/server-side-rendering-react-node-express/).  This library makes it very easy to server-side render your components.  There are two methods to server-side rendering:
   **If you are using JSX in your components and would like to render your components server side** - you must pre-compile your files, see https://github.com/babel/example-node-server as an example.  More coming soon.
   
1. In your controller, pass the relative path of your component instead of the registered component name to renderComponent:
   ```
   const reactHelper = require('react-helper');   
   const component = reactHelper.renderComponent('../path/to/SignUp')
   res.render('view-to-render', {component})
   ```
   
2. Pass the component itself to renderComponent.  **Note** - If you use this method you need to add "babel-register" to your package.json **and** require react-helper **before** your component.
   ```
   const reactHelper = require('react-helper');
   const SignUp = require('../path/to/SignUp');
   const component = reactHelper.renderComponent(SignUp) //IT'S THIS EASY
   res.render('view-to-render', {component})
   ```
   
## In progress features:

_I am creating this for use in my own project, so this will be progressing quickly_ 

## Shout out!
This library is inspired by React On Rails (https://github.com/shakacode/react_on_rails), a library that makes it insanely easy to add react to a Rails application. 

## Contributing
Feel free to open issues or pull requests!
