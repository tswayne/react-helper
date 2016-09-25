const reactDom = require('react-dom');
const React = require('react')

module.exports.register = function(component) {
  const componentName = Object.keys(component)[0]
  const dest = document.getElementById(componentName)
  if (dest) {
    reactDom.render((
      React.createElement(component[componentName])
    ), dest)
  }
};

module.exports.renderComponent = function(componentName) {
  return '<div id="' + componentName + '"></div>';
};