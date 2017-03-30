module.exports.register = function (component){
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

module.exports.renderComponent = function(component, props){
  var React = require('react');
  var ReactDOMServer = require('react-dom/server');
  var escapeHtml = require('escape-html');

  var propsString = props ? escapeHtml(JSON.stringify(props)) : '';
  var content = '';
  if (typeof component === 'function') {
    content = ReactDOMServer.renderToString(React.createElement(component, props))
    component = component.name
  } else {
    if (component.split('/').length > 1) {
      component = require('./' + require('path').dirname(module.parent.filename) + '/' + component);
      content = ReactDOMServer.renderToString(React.createElement(component, props))
      component = component.name
    }
  }
  return '<div id="react-helper-component-'+component.toLowerCase()+'" data-component-properties="'+ propsString +'">'+ content + '</div>';
};
