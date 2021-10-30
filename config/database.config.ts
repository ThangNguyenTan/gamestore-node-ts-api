import { Sequelize } from 'sequelize';
import config from 'config';

let db = new Sequelize(config.get('database_test'));

if (config.get('node_env') != 'test') {
  if (config.get('database_url')) {
    db = new Sequelize(config.get('database_url'), {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
  } else {
    db = new Sequelize(config.get('database'), config.get('username'), config.get('password'), {
      host: config.get('host'),
      dialect: config.get('dialect'),
      port: 5432,
    });
  }
}

export default db;
