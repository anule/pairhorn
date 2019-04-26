/* global describe, it */
var assert = require('chai').assert;
const { pairs } = require('../pairs');

describe("Pair generator", () => {
  describe("#generatePairs", () => {
    const text = "alpha beta omega zeta"
    let shuffled = pairs(text); 
    
    it('should shuffle pairs', () => {
      assert.notStrictEqual(text[0], shuffled[0])
    });
    
    it('should return an array of arrays', () => {
      assert.typeOf(shuffled, 'array')
      assert.typeOf(shuffled[0], 'array')
    })
    
    describe("odd number of team members", () => {
      const oddText = "alpha beta omega";
      let oddShuffled = pairs(oddText);
      
      it('should still return an array of arrays', () => {
        assert.typeOf(oddShuffled, 'array')
        assert.isTrue(oddShuffled.every(item => Array.isArray(item)))
      })
      
      it('should have an array with only one item', () => {
        let filtered = oddShuffled.filter(arr => arr.length == 1)
        assert.isNotEmpty(filtered)
        assert.lengthOf(filtered[0], 1)
      })
    })
    
    describe("even number of team members", () => {
      const evenText = "alpha beta omega gamma";
      let oddShuffled = pairs(evenText);
      
      it('should still return an array of arrays', () => {
        assert.typeOf(oddShuffled, 'array')
        assert.isTrue(oddShuffled.every(item => Array.isArray(item)))
      })
      
      it('should NOT have an array with only one item', () => {
        let filtered = oddShuffled.filter(arr => arr.length == 1)
        assert.isEmpty(filtered)
      })
    })
  })
})