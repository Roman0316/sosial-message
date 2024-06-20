const { PORT } = require('./config/dotenv');
const app = require('./app');
const { sequelize } = require('./services/sequelize');

async function start() {
  await sequelize.authenticate();
  console.log('Database module initialized');

  // await sequelize.sync({ force: true });
  // console.log('Database & tables created!');

  // await sequelize.drop();
  // console.log('All tables deleted');

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(0);
});
