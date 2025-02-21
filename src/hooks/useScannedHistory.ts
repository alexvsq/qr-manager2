import { useScannedListHistoryStore } from "@/store/ListsHistory.store";
import { useEffect } from "react";
import { ScannedHistoryData } from "@/types/types";
import { DeleteOneScannedHistory } from "@/functions/sql/setData";
import { GetScannedAllRows } from "@/functions/sql/getData";

export function useScannedHistory() {
  const ScannedListHistory = useScannedListHistoryStore(
    (state) => state.ScannedListHistory
  );
  const SetScannedListHistory = useScannedListHistoryStore(
    (state) => state.SetScannedListHistory
  );

  const AddinScannedHistoryList = async (NewItem: ScannedHistoryData) => {
    try {
      if (ScannedListHistory && ScannedListHistory.length > 0) {
        const newList = [NewItem, ...ScannedListHistory];
        SetScannedListHistory(newList);
      } else {
        SetScannedListHistory([NewItem]);
      }
    } catch (error) {
      console.error("AddAndSaveScannedHistory", error);
    }
  };

  const DeleteScannedHistory = async (id: number) => {
    if (!ScannedListHistory) return;
    try {
      const filteredList = ScannedListHistory.filter((item) => item.id !== id);
      SetScannedListHistory(filteredList);
      await DeleteOneScannedHistory(id);
    } catch (error) {
      console.error("DeleteScannedHistory", error);
    }
  };

  useEffect(() => {
    GetScannedAllRows()
      .then((data) => {
        if (data) {
          const dataReverse = data.reverse();
          SetScannedListHistory(dataReverse);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { ScannedListHistory, AddinScannedHistoryList, DeleteScannedHistory };
}
