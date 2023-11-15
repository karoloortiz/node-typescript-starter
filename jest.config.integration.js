var config = require('./jest.config');
config.testRegex = './src/.*\\.(integration)?\\.(ts|ts)$';
module.exports = config;
