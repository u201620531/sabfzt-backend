import { DB_HOST, DB_PASSWORD, DB_NAME, DB_USER, DB_PORT } from "./config";
export default {
  database: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME,
  },
};
