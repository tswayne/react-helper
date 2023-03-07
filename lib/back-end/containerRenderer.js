var React = require('react');
var ReactDOMServer = require('react-dom/server');
var escapeHtml = require('escape-html');

module.exports.renderContainer = function(component, props, displayName){
  const propsString = props ? escapeHtml(JSON.stringify(props)) : '';
  let content = '';
  if (typeof component === 'function') {
    content = ReactDOMServer.renderToString(React.createElement(component, props));
    component = component.name;
  } else {
    if (component.split('/').length > 1) {
      component = require('./' + require('path').dirname(module.parent.filename) + '/' + component);
      content = ReactDOMServer.renderToString(React.createElement(component, props));
      component = component.name;
    }
  }
  const serverRendered = content !== ''
  const id = displayName ? displayName.toLowerCase() : component.toLowerCase();
  return '<div id="react-helper-component-'+id+'" data-component-properties="'+ propsString +'" data-server-rendered="'+serverRendered+'" >'+ content + '</div>';
};
