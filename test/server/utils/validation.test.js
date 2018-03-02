const expect = require('expect');
const {isRealString} = require('./../../../server/utils/validation');

/* global define, it, describe, before, beforeEach, afterEach, after */
describe('isRealString', () => {
  it('Should reject non string values', () => {
    expect(isRealString(12)).toBeFalsy();
    expect(isRealString(['12', '13'])).toBeFalsy();
    expect(isRealString({a: 'Hello'})).toBeFalsy();
    expect(isRealString(undefined)).toBeFalsy();
  });
  it('should reject strings with only spaces', () => {
    expect(isRealString('      ')).toBeFalsy();
    expect(isRealString('           ')).toBeFalsy();
    expect(isRealString(' ')).toBeFalsy();
  });
  it('should allow string with non-space characters only', () => {
    expect(isRealString('   f   ')).toBeTruthy();
    expect(isRealString('asdsasdg')).toBeTruthy();
    expect(isRealString('as ds a sdg')).toBeTruthy();
  });
});