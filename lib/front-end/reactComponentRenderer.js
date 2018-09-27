var React = require('react');
var reactDom = require('react-dom');

module.exports.findContainerAndRenderComponent = function (component, serverRender, frontEndProps){
  var componentName = Object.keys(component)[0];
  var dest = document.getElementById('react-helper-component-' + componentName.toLowerCase());
  if (dest) {
    var propString = dest.getAttribute('data-component-properties');
    var props = frontEndProps ? frontEndProps : {};
    if (propString) {
      props = Object.assign({}, props, JSON.parse(propString));
    }

    if (serverRender) {
      reactDom.hydrate((
        React.createElement(component[componentName], props)
      ), dest);
    } else {
      reactDom.render((
        React.createElement(component[componentName], props)
      ), dest);
    }
  }
};
