import config from 'config';

module.exports = {
  development: config.get('database'),
  test: config.get('database_test'),
  production: config.get('database'),
};
