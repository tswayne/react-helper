const reactDom = require('react-dom');
const React = require('react');

module.exports.register = function(component) {
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

module.exports.renderComponent = function(componentName, props) {
  var propsString = JSON.stringify(props) || '';
  var component = componentName.toLowerCase();
  return '<div id="react-helper-component-'+component+'" data-component-properties='+ propsString +'></div>';
};
