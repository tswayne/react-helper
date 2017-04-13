const mocha = require('mocha');
const suite = mocha.suite;
const test = mocha.test;
const chai = require('chai');
const assert = chai.assert;
const containerRender = require('../../lib/back-end/containerRenderer');

suite('containerRender', function() {
  test('renderContainer renders div with proper id and component-properties', function() {
    const expectedContainer = '<div id="react-helper-component-mycomponent" data-component-properties="{&quot;aProp&quot;:&quot;a value&quot;}"></div>';
    assert.equal(containerRender.renderContainer('MyComponent', {aProp: 'a value'}), expectedContainer);
  });

  test('renderContainer with only component name renders empty component-properties', function() {
    const expectedContainer = '<div id="react-helper-component-mycomponent" data-component-properties=""></div>';
    assert.equal(containerRender.renderContainer('MyComponent'), expectedContainer);
  });
});