const { generateMessage } = require('./../../../server/utils/message');
const expect = require('expect');

/* global define, it, describe, before, beforeEach, afterEach, after */
describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Alberto';
    const text = 'Test message text';
    const message = generateMessage(from, text);
    expect(message).toMatchObject({ from, text });
    expect(typeof message.createdAt).toBe('number');
  });
});