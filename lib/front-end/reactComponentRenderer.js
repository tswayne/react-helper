module.exports.findContainerAndRenderComponent = function (component){
  var React = require('react');
  var reactDom = require('react-dom');
  var componentName = Object.keys(component)[0];
  var dest = document.getElementById('react-helper-component-' + componentName.toLowerCase());
  if (dest) {
    var propString = dest.getAttribute('data-component-properties');
    var props = {};
    if (propString) {
      props = JSON.parse(propString);
    }
    reactDom.render((
      React.createElement(component[componentName], props)
    ), dest);
  }
};