require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: process.env.HEROKU_POSTGRESQL_RED_URL,
    dialect: 'postgres',
    logging: false,
  },
}