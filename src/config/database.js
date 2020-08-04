module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'holidays',
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  }, 
};
