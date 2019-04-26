/* global describe, it */
var assert = require('chai').assert;
const message = require('../message');

var pairs = [["alpha", "beta"], ["omega", "zeta"], ['one', 'two'], ["chi"]];

describe('Message generator', () => {
  describe("#message", () => {
    it('shoud return an string', () => {
      assert.isString(message(pairs));
    })
    it('should write each sentence on a new line', () => {
      assert.include(message(pairs), '\n');
    })
    describe('message syntax', () => {
      it('should check if an array only has one person', () => {
        assert.include(message(pairs), 'dancing on their own');
      })
    })
  })
})