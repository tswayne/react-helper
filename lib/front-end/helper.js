const React = require('react');
const reactDom = require('react-dom');

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

  render(frontEndProps={}, serverRender=false) {
    const component = this.component
    const destination = this.destinationElement
    const props = Object.assign({}, this.getProps(), frontEndProps)

    if (serverRender) {
      reactDom.hydrate(React.createElement(component, props), destination)
    } else {
      reactDom.render(React.createElement(component, props), destination)
    }
  }
}

module.exports = Helper