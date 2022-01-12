import { connectToDatabase } from "../db/connect";
import envs from "./envs";

export const startServer = async () => {
  try {
    await connectToDatabase(envs.mongoURI);
    console.log('connected to database successfully');
    console.log(`${new Date().toLocaleTimeString()} - Server on port: ${envs.port}`);
  } catch (error) {
    console.log('failed to connect to database: ', error);
  }
}