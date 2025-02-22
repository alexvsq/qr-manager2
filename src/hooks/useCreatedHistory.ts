import { useEffect } from "react";
import { GetAllCreatedQr } from "@/functions/sql/getData";
import { getName } from "@/functions/OrderData";
import { SaveCreateQr, DeleteOneCreatedHistory } from "@/functions/sql/setData";
import { useCreatedListHistoryStore } from "@/store/ListsHistory.store";

export function useCreatedHistory() {
  const CreatedListHistory = useCreatedListHistoryStore(
    (state) => state.ScannedListHistory
  );
  const SetCreatedListHistory = useCreatedListHistoryStore(
    (state) => state.SetScannedListHistory
  );

  const AddInCreatedListHistory = async (
    value: string,
    type: string,
    notes: string = ""
  ) => {
    try {
      const name = getName(type, value);

      const itemToSave = {
        name: name,
        timeStamp: Date.now(),
        value: value,
        notes: notes,
        type: type,
        barcodeType: "qr",
      };

      const newID = await SaveCreateQr(itemToSave);
      if (!newID) throw new Error("newID is null");
      const NewItem = { ...itemToSave, id: newID };

      if (CreatedListHistory && CreatedListHistory.length > 0) {
        const newList = [NewItem, ...CreatedListHistory];
        SetCreatedListHistory(newList);
      } else {
        SetCreatedListHistory([NewItem]);
      }
      return newID;
    } catch (error) {
      console.error("AddAndSaveScannedHistory", error);
    }
  };

  const DeleteCreatedHistory = async (id: number) => {
    if (!CreatedListHistory) return;
    try {
      const filteredList = CreatedListHistory.filter((item) => item.id !== id);
      SetCreatedListHistory(filteredList);
      await DeleteOneCreatedHistory(id);
    } catch (error) {
      console.error("DeleteCreatedHistory", error);
    }
  };

  const DeleteListCreatedHistory = async () => {
    try {
      SetCreatedListHistory(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetAllCreatedQr()
      .then((data) => {
        if (data) {
          const dataReverse = data.reverse();
          SetCreatedListHistory(dataReverse);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return {
    CreatedListHistory,
    AddInCreatedListHistory,
    DeleteCreatedHistory,
    DeleteListCreatedHistory,
  };
}
