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

export const SaveCreateQr = async (item: ScannedHistoryDataToSave) => {
  try {
    const { name, timeStamp, value, notes, type, barcodeType } = item;
    const result = await db.runAsync(
      "INSERT INTO CreatedQrdHistory (name,timeStamp, value, notes, type, barcodeType) VALUES (?,?,?,?,?,?)",
      [name, timeStamp, value, notes, type, barcodeType]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("CreatedQrdHistory", error);
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

export const UpdateNotesOfCreatedHistory = async (
  id: number,
  notes: string
) => {
  try {
    await db.runAsync("UPDATE CreatedQrdHistory SET notes = ? WHERE id = ?", [
      notes,
      id,
    ]);
  } catch (error) {
    console.error("UpdateNotesOfCreatedHistory", error);
  }
};

export const DeleteOneScannedHistory = async (id: number) => {
  try {
    await db.runAsync("DELETE FROM ScannedHistory WHERE id = ?", [id]);
  } catch (error) {
    console.error("DeleteOneScannedHistory", error);
  }
};

export const DeleteOneCreatedHistory = async (id: number) => {
  try {
    await db.runAsync("DELETE FROM CreatedQrdHistory WHERE id = ?", [id]);
  } catch (error) {
    console.error("DeleteOneCreatedHistory", error);
  }
};

export const deleteall = async () => {
  try {
    //const res = await db.execAsync("DROP TABLE ScannedHistory");
    //const res2 = await db.execAsync("DROP TABLE CreatedQrdHistory");
    const res = await db.execAsync("DELETE FROM ScannedHistory");
    const res2 = await db.execAsync("DELETE FROM CreatedQrdHistory");

    console.log(res);
    console.log(res2);
  } catch (error) {
    console.error(error);
  }
};
