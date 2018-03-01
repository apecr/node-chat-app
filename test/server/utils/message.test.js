const { generateMessage, generateLocationMessage } = require('./../../../server/utils/message');
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
describe('generateLocationMessage', () => {
  it('should generate the correct message object with the url for location', () => {
    const from = 'Alberto';
    const longitude = 12345;
    const latitude = -43521;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = generateLocationMessage(from, latitude, longitude);
    expect(message).toMatchObject({ from, url });
    expect(typeof message.createdAt).toBe('number');
    expect(typeof message.url).toBe('string');
    expect(message.url).toBe(url);
  });
});