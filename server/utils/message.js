const timeStamp = () => new Date().getTime();

const generateMessage = (from, text) => {
  return {from, text, createdAt: timeStamp()};
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {from, url: `https://www.google.com/maps?q=${latitude},${longitude}`, createdAt: timeStamp()};
};

module.exports = {
  generateMessage,
  generateLocationMessage
};