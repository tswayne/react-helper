const React = require('react');
const reactDom = require('react-dom/client');

class Helper {
  constructor(component) {
    const componentName = Object.keys(component)[0]

    this.component = component[componentName]
    this.destinationElement = document.getElementById(`react-helper-component-${componentName.toLowerCase()}`)
  }

  getProps() {
    if (this.props) {
      return this.props
    }

    const propString = this.destinationElement.getAttribute('data-component-properties');
    const props = propString ? Object.assign({}, JSON.parse(propString)): {}

    this.props = props
    return props
  }

  shouldHydrateComponent(serverRender) {
    const markedAsServerRendered = this.destinationElement.getAttribute('data-server-rendered') === "true"
    return serverRender === true || (serverRender !== false && markedAsServerRendered === true)
  }

  render(frontEndProps={}, serverRender) {
    const component = this.component
    const destination = this.destinationElement
    const props = Object.assign({}, this.getProps(), frontEndProps)

    if (this.shouldHydrateComponent(serverRender)) {
      reactDom.hydrateRoot(destination, React.createElement(component, props))
    } else {
      const root = reactDom.createRoot(destination)
      root.render(React.createElement(component, props))
    }
  }
}

module.exports = Helper
