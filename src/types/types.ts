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

export interface Config {
  vibration: boolean;
  sound: boolean;
  showPopUp: boolean;
  SecondDelay: number;
  language: string;
}
