module.exports.register = require('./front-end/reactComponentRenderer').findContainerAndRenderComponent;
module.exports.renderComponent = require('./back-end/containerRenderer').renderContainer;
module.exports.Helper = require('./front-end/helper')