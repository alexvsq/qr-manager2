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

const TIME_STAMP = Date.now();

const res = db.getAllSync("SELECT * FROM ScannedHistory");
if (res.length === 0) {
  db.runSync(
    "INSERT INTO ScannedHistory (name, timeStamp, value, notes, type, barcodeType) VALUES ('+1234567890',?, 'TEL:+1234567890', '', 'number', 'qr')",
    [TIME_STAMP]
  );
  db.runSync(
    "INSERT INTO ScannedHistory (name, timeStamp, value, notes, type, barcodeType) VALUES ('google', ?, 'https://www.google.com', '', 'web', 'qr')",
    [TIME_STAMP]
  );
  db.runSync(
    "INSERT INTO ScannedHistory (name, timeStamp, value, notes, type, barcodeType) VALUES ('example@email.com', ?, 'MATMSG:TO:example@email.com;SUB:example;BODY:hi, how are you;', '', 'email', 'qr')",
    [TIME_STAMP]
  );
  db.runSync(
    "INSERT INTO ScannedHistory (name, timeStamp, value, notes, type, barcodeType) VALUES ('example text', ?, 'SMSTO:+1234567890:example text', '', 'sms', 'qr')",
    [TIME_STAMP]
  );
  db.runSync(
    "INSERT INTO ScannedHistory (name, timeStamp, value, notes, type, barcodeType) VALUES ('red example', ?, 'WIFI:S:red example;T:WPA;P:12345678;H:false;;', '', 'wifi', 'qr')",
    [TIME_STAMP]
  );
}
