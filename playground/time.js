// 01/01/1970 00:00:00 am --> UNIX epic
const moment = require('moment');

const date = moment();
console.log(date.format('MMM Do YYYY'));

const someTimestamp = moment().valueOf();
console.log(someTimestamp);

const createdAt = 1234;
const date2 = moment(createdAt);
console.log(date2.format('h:mm a'));
console.log(date.format('h:mm a'));