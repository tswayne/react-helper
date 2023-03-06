const mocha = require('mocha');
const suite = mocha.suite;
const test = mocha.test;
const beforeEach = mocha.beforeEach;
const afterEach = mocha.afterEach;
const chai = require('chai');
const assert = chai.assert;
const jsdom = require("jsdom");
const React = require('react');
const reactDom = require('react-dom/client');
const sinon = require('sinon');

const reactComponentRenderer = require('../../lib/front-end/reactComponentRenderer');
const reactCreateElementSpy = sinon.spy();
const reactDomRenderSpy = sinon.spy();
const createRootSpy = sinon.spy();
const reactDomHydrateSpy = sinon.spy();

suite('reactComponentRenderer', function() {
  beforeEach(function() {
    sinon.stub(React, 'createElement').callsFake(reactCreateElementSpy)
    sinon.stub(reactDom, 'createRoot').callsFake(createRootSpy).returns({ render: reactDomRenderSpy })
    sinon.stub(reactDom, 'hydrateRoot').callsFake(reactDomHydrateSpy)
  });

  afterEach(function() {
    React.createElement.restore();
    reactDom.createRoot.restore();
    reactDom.hydrateRoot.restore();
    reactCreateElementSpy.resetHistory();
    reactDomRenderSpy.resetHistory();
  });

  test('findContainerAndRenderComponent renders react component to react div with props', function() {

    const container = '<div id="react-helper-component-mycomponent" data-component-properties="{&quot;aProp&quot;:&quot;a value&quot;}"></div>';
    global.document = new jsdom.JSDOM(container).window.document;

    reactComponentRenderer.findContainerAndRenderComponent({MyComponent: 'DummyReactComponentStub'})
    assert.isTrue(reactDomRenderSpy.called)
    assert.equal(reactDom.createRoot.args[0][0].id, 'react-helper-component-mycomponent');
    assert.equal(reactCreateElementSpy.args[0][0], 'DummyReactComponentStub');
    assert.deepEqual(reactCreateElementSpy.args[0][1], {aProp: 'a value'});
  });

  test('findContainerAndRenderComponent hydrates react component to react div with props and serverRender is set', function() {

    const container = '<div id="react-helper-component-mycomponent" data-component-properties="{&quot;aProp&quot;:&quot;a value&quot;}"></div>';
    global.document = new jsdom.JSDOM(container).window.document;

    reactComponentRenderer.findContainerAndRenderComponent({MyComponent: 'DummyReactComponentStub'}, true)
    assert.equal(reactDomHydrateSpy.args[0][0].id, 'react-helper-component-mycomponent');
  });

  test('findContainerAndRenderComponent renders react component to react div no props when data-component-properties is empty', function() {

    const container = '<div id="react-helper-component-mycomponent" data-component-properties=""></div>';
    global.document = new jsdom.JSDOM(container).window.document;

    reactComponentRenderer.findContainerAndRenderComponent({MyComponent: 'DummyReactComponentStub'})
    assert.isTrue(reactDomRenderSpy.called)
    assert.equal(reactDom.createRoot.args[0][0].id, 'react-helper-component-mycomponent');
    assert.equal(reactCreateElementSpy.args[0][0], 'DummyReactComponentStub');
    assert.deepEqual(reactCreateElementSpy.args[0][1], {});
  });

  test('findContainerAndRenderComponent does not render when container does not exist', function() {

    global.document = new jsdom.JSDOM("").window.document;

    reactComponentRenderer.findContainerAndRenderComponent({MyComponent: 'DummyReactComponentStub'})
    assert.isTrue(reactDomRenderSpy.notCalled);
    assert.isTrue(reactCreateElementSpy.notCalled);
  });
});
