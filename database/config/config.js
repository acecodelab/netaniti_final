import dotenv from 'dotenv'
dotenv.config()

export default {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }

  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }


  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
}
