import { db } from "@/functions/sql/storageData";
import { ScannedHistoryData } from "@/types/types";

export const GetOneScannedHistory = async (
  id: number
): Promise<ScannedHistoryData | null> => {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM ScannedHistory WHERE id = ?",
      [id]
    );
    if (result) {
      return result as ScannedHistoryData;
    }
    return null;
  } catch (error) {
    console.error("GetOneScannedHistory", error);
    return null;
  }
};

export const GetOneCreatedHistory = async (
  id: number
): Promise<ScannedHistoryData | null> => {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM CreatedQrdHistory WHERE id = ?",
      [id]
    );
    if (result) {
      return result as ScannedHistoryData;
    }
    return null;
  } catch (error) {
    console.error("GetOneCreatedHistory", error);
    return null;
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
        name: row.name ? String(row.name) : "",
        timeStamp: Number(row.timeStamp),
        value: String(row.value),
        notes: row.notes !== null ? String(row.notes) : "",
        type: row.type ? String(row.type) : "",
        barcodeType: row.barcodeType ? String(row.barcodeType) : "",
      }));
    }
    return null;
  } catch (error) {
    console.error("GetScannedAllRows", error);
    return null;
  }
};

export const GetAllCreatedQr = async (): Promise<
  ScannedHistoryData[] | null
> => {
  try {
    const allRows: any[] = await db.getAllAsync(
      "SELECT * FROM CreatedQrdHistory"
    );

    if (allRows.length > 0) {
      return allRows.map((row) => ({
        id: Number(row.id),
        name: row.name ? String(row.name) : "",
        timeStamp: Number(row.timeStamp),
        value: String(row.value),
        notes: row.notes !== null ? String(row.notes) : "",
        type: row.type ? String(row.type) : "",
        barcodeType: row.barcodeType ? String(row.barcodeType) : "",
      }));
    }
    return null;
  } catch (error) {
    console.error("GetAllCreatedQr", error);
    return null;
  }
};
