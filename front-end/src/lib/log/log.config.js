module.exports = {
    development: {
      console: 'debug',
      file: 'debug'
    },
    staging: {
        console: 'info',
        file: 'info'
    },
    production: {
      console: 'info',
      file: 'warn'
    },
    test: {
      console: 'debug',
      file: 'debug'
    }
  };