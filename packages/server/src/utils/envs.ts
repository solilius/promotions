import * as  dotenv from 'dotenv';

dotenv.config();

export default {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT,
  allowedDomains: process.env.ALLOWED_DOMAINS
};