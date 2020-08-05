require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: (process.env.DB_HOST || 'localhost'),
  username: (process.env.DB_USER || 'postgres'),
  password: (process.env.DB_PASSWORD || 'docker'),
  database: (process.env.DB_NAME || 'holidays'),
  port: '5432',
  ssl: true,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
};
