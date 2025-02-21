import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("databases");

db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS ScannedHistory (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, timeStamp INTEGER NOT NULL, value TEXT NOT NULL, notes TEXT NOT NULL, type TEXT NOT NULL, barcodeType TEXT NOT NULL);
`);
db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS CreatedQrdHistory (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, timeStamp INTEGER NOT NULL, value TEXT NOT NULL, notes TEXT NOT NULL, type TEXT NOT NULL, barcodeType TEXT NOT NULL);
`);
