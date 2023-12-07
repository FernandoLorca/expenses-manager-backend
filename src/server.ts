import app from './app';
import { sequelize } from './database/connection';
// import './database/databaseTablesEstructures';

const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
};
main();
