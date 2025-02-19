export interface ScannedHistoryDataToSave {
  name: string;
  timeStamp: number;
  value: string;
  notes: string;
  type: string;
  barcodeType: string;
}

export interface ScannedHistoryData {
  id: number;
  name: string;
  timeStamp: number;
  value: string;
  notes: string;
  type: string;
  barcodeType: string;
}
