
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize("practicalExam", "root", "password123", {
  host: "127.0.0.1",
  port: 3306,
  dialect: 'mysql',
  logging: console.log,  // Enable logging, or set to false to disable
});
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { connectDB, sequelize, Sequelize };

export default sequelize;