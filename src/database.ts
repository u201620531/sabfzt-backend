import mysql from "promise-mysql";

import keys from "./keys";

const pool = mysql.createPool({
  host: keys.database.host,
  database: keys.database.database,
  password: keys.database.password,
  user: keys.database.user,
  port: keys.database.port,
});

pool.getConnection().then((connection) => {
  pool.releaseConnection(connection);
  console.log("DB is Connected");
});

export default pool;
