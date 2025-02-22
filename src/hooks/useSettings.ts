import { useState, useEffect } from "react";
import i18n from "i18next";
import { deleteall } from "@/functions/sql/setData";
import { getConfig, saveConfig } from "@/functions/storeConfig";
import { useConfigStore } from "@/store/settingsStore";
import { useCreatedHistory } from "@/hooks/useCreatedHistory";
import { useScannedHistory } from "@/hooks/useScannedHistory";
import { CONFIG_SCANNED_DEFAULT } from "@/utils/constants";

export function useSettings() {
  const configState = useConfigStore((state) => state.configState);
  const setConfigState = useConfigStore((state) => state.setConfigState);

  const { DeleteListCreatedHistory } = useCreatedHistory();
  const { DeleteListScannedHistory } = useScannedHistory();

  const toggleLanguage = (code: string) => {
    i18n.changeLanguage(code);
    const newConfig = { ...configState, language: code };
    setConfigState(newConfig);
    saveConfig(newConfig);
  };

  const DeleteAll = async () => {
    await deleteall();
    DeleteListCreatedHistory();
    DeleteListScannedHistory();
  };

  const saveNewConfig = async (key: string, value: any) => {
    try {
      const newConfig = { ...configState, [key]: value };
      setConfigState(newConfig);
      await saveConfig(newConfig);
    } catch (error) {
      console.error("saveNewConfig", error);
    }
  };

  const setDefaultConfig = async () => {
    setConfigState(CONFIG_SCANNED_DEFAULT);
    i18n.changeLanguage(CONFIG_SCANNED_DEFAULT.language);
    await saveConfig(CONFIG_SCANNED_DEFAULT);
  };

  useEffect(() => {
    getConfig().then((config) => {
      if (config) {
        console.log("SAVE: ", config);
        setConfigState(config);
        i18n.changeLanguage(config.language);
      }
    });
  }, []);

  return {
    toggleLanguage,
    DeleteAll,
    configState,
    saveNewConfig,
    setDefaultConfig,
  };
}
