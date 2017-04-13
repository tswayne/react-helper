module.exports.renderContainer = function(component, props){
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
