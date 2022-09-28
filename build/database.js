"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const pool = promise_mysql_1.default.createPool({
    host: keys_1.default.database.host,
    database: keys_1.default.database.database,
    password: keys_1.default.database.password,
    user: keys_1.default.database.user,
    port: keys_1.default.database.port,
});
pool.getConnection().then((connection) => {
    pool.releaseConnection(connection);
    console.log("DB is Connected");
});
exports.default = pool;
