import { setStringAsync } from "expo-clipboard";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";

export const copyToClipboard = async (text: string) => {
  if (!text || text == "") return;
  try {
    await setStringAsync(text);
    await VibrationComfirm();
  } catch (error) {
    console.error("copyToClipboard ", error);
  }
};

export const VibrationComfirm = async () => {
  notificationAsync(NotificationFeedbackType.Success);
};
