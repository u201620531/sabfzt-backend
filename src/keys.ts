import { DB_HOST, DB_PASSWORD, DB_NAME, DB_USER, DB_PORT } from "./config";
export default {
  database: {
    host: DB_HOST, //'sabzft-pruebas.mysql.database.azure.com', //'localhost',
    user: DB_USER, // 'admin_sabzft@sabzft-pruebas',//root',
    password: DB_PASSWORD, // 'UPCprueba@2022',//'Yasuan100707',
    port: DB_PORT, // 3306,
    database: DB_NAME, // 'sabzft-pruebas'
  },
};
