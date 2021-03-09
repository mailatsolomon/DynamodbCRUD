const moment = require('moment');
const tz = require('moment-timezone');

const localeTimeZone =  moment().tz('Asia/Taipei').format('MMMM DD, YYYY h:mm:ss a');
const getCurrentTime = new Date().getTime();
const defaultFormat = moment().format();

module.exports = { localeTimeZone, getCurrentTime, defaultFormat };
