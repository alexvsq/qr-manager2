import { GetScannedAllRows } from "@/functions/sql/storageData";
import { useScannedListHistoryStore } from "@/store/ScannedHistory.store";
import { useState, useEffect } from "react";
import { SaveScannedHistory } from "@/functions/sql/storageData";
import { BarcodeScanningResult } from "expo-camera";
import { ScannedHistoryDataToSave } from "@/types/types";

export function useScannedHistory() {
  const ScannedListHistory = useScannedListHistoryStore(
    (state) => state.ScannedListHistory
  );
  const SetScannedListHistory = useScannedListHistoryStore(
    (state) => state.SetScannedListHistory
  );

  interface AddAndSaveScannedHistoryProps {
    ScannedResult: BarcodeScanningResult;
    notes?: string;
  }

  const AddAndSaveScannedHistory = async ({
    ScannedResult,
    notes = "",
  }: AddAndSaveScannedHistoryProps) => {
    try {
      const { data, type } = ScannedResult;

      const NewItem: ScannedHistoryDataToSave = {
        timeStamp: Date.now(),
        value: data,
        notes,
        barcodeType: type,
      };

      const NewId = await SaveScannedHistory(NewItem);

      if (!NewId) throw new Error("NewId is null");

      const newToList = { ...NewItem, id: NewId };

      if (ScannedListHistory && ScannedListHistory.length > 0) {
        const newList = [newToList, ...ScannedListHistory];
        SetScannedListHistory(newList);
      } else {
        SetScannedListHistory([newToList]);
      }
    } catch (error) {
      console.error("AddAndSaveScannedHistory", error);
    }
  };

  useEffect(() => {
    GetScannedAllRows()
      .then((data) => {
        if (data) {
          SetScannedListHistory(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { ScannedListHistory, AddAndSaveScannedHistory };
}
