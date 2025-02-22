import { setStringAsync } from "expo-clipboard";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { Audio } from "expo-av";

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
  impactAsync(ImpactFeedbackStyle.Heavy);
};

export const AuidoConfirm = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/audio/beep.mp3")
    );
    await sound.playAsync();
  } catch (error) {
    console.error("AuidoConfirm ", error);
  }
};
