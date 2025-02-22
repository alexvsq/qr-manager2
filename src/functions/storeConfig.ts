import AsyncStorage from "@react-native-async-storage/async-storage";
import { Config } from "@/types/types";

export const saveConfig = async (newValue: Config) => {
  try {
    await AsyncStorage.setItem("config", JSON.stringify(newValue));
  } catch (error) {
    console.error("saveConfig", error);
  }
};

export const getConfig = async (): Promise<Config | null> => {
  try {
    const config = await AsyncStorage.getItem("config");
    if (config) {
      return JSON.parse(config);
    }
    return null;
  } catch (error) {
    console.error("getConfig", error);
    return null;
  }
};
