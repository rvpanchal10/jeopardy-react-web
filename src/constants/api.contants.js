
const env = process.env.NODE_ENV || 'development';

const apiEnvironment = {
    localhost: {
        api: 'http://jservice.io/api'
    },
    development: {
        api: 'http://jservice.io/api'
    },
    production: {
        api: 'http://jservice.io/api'
    }
};

module.exports = apiEnvironment[env];
