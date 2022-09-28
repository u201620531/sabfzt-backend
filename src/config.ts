export const PORT = process.env.PORT || 3000;

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "Yasuan100707";
export const DB_PORT = parseInt(
  process.env.DB_PORT === undefined ? "3306" : process.env.DB_PORT
);
export const DB_NAME = process.env.DB_NAME || "sabfztdb";
