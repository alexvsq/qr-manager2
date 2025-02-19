import { db } from "@/functions/sql/storageData";
import { ScannedHistoryDataToSave } from "@/types/types";

export const SaveScannedHistory = async (item: ScannedHistoryDataToSave) => {
  try {
    const { name, timeStamp, value, notes, type, barcodeType } = item;
    const result = await db.runAsync(
      "INSERT INTO ScannedHistory (name,timeStamp, value, notes, type, barcodeType) VALUES (?,?,?,?,?,?)",
      [name, timeStamp, value, notes, type, barcodeType]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("SaveScannedHistory", error);
  }
};

export const UpdateNotesOfScannedHistory = async (
  id: number,
  notes: string
) => {
  try {
    await db.runAsync("UPDATE ScannedHistory SET notes = ? WHERE id = ?", [
      notes,
      id,
    ]);
  } catch (error) {
    console.error("UpdateNotesOfScannedHistory", error);
  }
};

export const deleteall = async () => {
  try {
    const res = db.execSync("DROP TABLE IF EXISTS ScannedHistory");
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
