var React = require('react');
var reactDom = require('react-dom/client');

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
      reactDom.hydrateRoot(dest, React.createElement(component[componentName], props))
    } else {
      const root = reactDom.createRoot(dest)
      root.render(React.createElement(component[componentName], props))
    }
  }
};
