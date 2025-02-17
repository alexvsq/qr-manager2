export interface ScannedHistoryDataToSave {
  timeStamp: number;
  value: string;
  notes: string;
  barcodeType: string;
}

export interface ScannedHistoryData {
  id: number;
  timeStamp: number;
  value: string;
  notes: string;
  barcodeType: string;
}

export interface ScannedHistoryList {
  id: number;
  type?: string;
  timeStamp: number;
  value: string;
  notes: string;
  barcodeType: string;
}
