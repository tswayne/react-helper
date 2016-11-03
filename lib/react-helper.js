require("babel-register");
const reactDom = require('react-dom');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const escapeHtml = require('escape-html');

module.exports.register = function(component) {
  const componentName = Object.keys(component)[0];
  const dest = document.getElementById('react-helper-component-' + componentName.toLowerCase());
  if (dest) {
    const propString = dest.getAttribute('data-component-properties');
    let props = {};
    if (propString) {
      props = JSON.parse(propString);
    }
    reactDom.render((
      React.createElement(component[componentName], props)
    ), dest);
  }
};

module.exports.renderComponent = function(component, props) {
  const propsString = escapeHtml(JSON.stringify(props)) || '';
  let content = '';
  if (typeof component === 'function') {
    content = ReactDOMServer.renderToString(React.createElement(component, props))
    component = component.name
  } else {
    if (component.split('/').length > 0) {
      component = require('./' + require('path').dirname(module.parent.filename) + '/' + component);
      content = ReactDOMServer.renderToString(React.createElement(component, props))
      component = component.name
    }
  }
  return '<div id="react-helper-component-'+component.toLowerCase()+'" data-component-properties="'+ propsString +'">'+ content + '</div>';
};