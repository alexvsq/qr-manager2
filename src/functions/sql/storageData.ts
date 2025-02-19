import * as SQLite from "expo-sqlite";
import { ScannedHistoryDataToSave, ScannedHistoryData } from "@/types/types";

export const db = SQLite.openDatabaseSync("databases");

db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS ScannedHistory (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, timeStamp INTEGER NOT NULL, value TEXT NOT NULL, notes TEXT NOT NULL, type TEXT NOT NULL, barcodeType TEXT NOT NULL);
`);
db.execSync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS CreatedHistory (id INTEGER PRIMARY KEY NOT NULL,timeStamp TEXT NOT NULL, value TEXT NOT NULL, notes TEXT , barcodeType TEXT);
        `);
/* 
    INSERT INTO ScannedHistory (timeStamp, value, notes,barcodeType) VALUES ("1739810161500", "WIFI:S:REPETIDOR GERARDO;T:WPA;P:10400494;H:false;;","" ,"qr");
    
*/
