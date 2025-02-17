import * as SQLite from "expo-sqlite";
import { ScannedHistoryDataToSave, ScannedHistoryData } from "@/types/types";

const db = SQLite.openDatabaseSync("databases");

db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS ScannedHistory (id INTEGER PRIMARY KEY NOT NULL,timeStamp INTEGER NOT NULL, value TEXT NOT NULL, notes TEXT NOT NULL, barcodeType TEXT NOT NULL);
`);
db.execSync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS CreatedHistory (id INTEGER PRIMARY KEY NOT NULL,timeStamp TEXT NOT NULL, value TEXT NOT NULL, notes TEXT , barcodeType TEXT);
        `);
/* 
    INSERT INTO ScannedHistory (timeStamp, value, notes,barcodeType) VALUES ("1739810161500", "WIFI:S:REPETIDOR GERARDO;T:WPA;P:10400494;H:false;;","" ,"qr");
    
*/

export const SaveScannedHistory = async (item: ScannedHistoryDataToSave) => {
  try {
    const { value, barcodeType, notes, timeStamp } = item;
    const result = await db.runAsync(
      "INSERT INTO ScannedHistory (timeStamp, value, notes,barcodeType) VALUES (?,?,?,?)",
      [timeStamp, value, notes, barcodeType]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("SaveScannedHistory", error);
  }
};

export const GetScannedAllRows = async (): Promise<
  ScannedHistoryData[] | null
> => {
  try {
    const allRows: any[] = await db.getAllAsync("SELECT * FROM ScannedHistory");

    if (allRows.length > 0) {
      return allRows.map((row) => ({
        id: Number(row.id),
        timeStamp: Number(row.timeStamp),
        value: String(row.value),
        notes: row.notes !== null ? String(row.notes) : "",
        barcodeType: row.barcodeType ? String(row.barcodeType) : "",
      }));
    }
    return null;
  } catch (error) {
    console.error("GetScannedAllRows", error);
    return null;
  }
};

export const deleteall = async () => {
  try {
    db.execSync("DELETE  FROM ScannedHistory");
  } catch (error) {
    console.error(error);
  }
};
