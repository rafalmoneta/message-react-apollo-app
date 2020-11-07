import Sequelize from 'sequelize';
 
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    define: {
      underscored: true,
    }
  },
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
  Channel: sequelize.import('./channel'),
  Team: sequelize.import('./team'),
  Member: sequelize.import('./member'),
};
 
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});


models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
// // models.sequelize = sequelize;
// // models.Sequelize = Sequelize;

// export { sequelize };
// export default models;