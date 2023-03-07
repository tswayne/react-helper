const React = require('react')
const Helper = require('./helper')

module.exports.findContainerAndRenderComponent = function (component, serverRender, frontEndProps){
  const reactHelper = new Helper(component)
  if (!reactHelper.destinationElement) { return }
  reactHelper.render(frontEndProps, serverRender)
}
