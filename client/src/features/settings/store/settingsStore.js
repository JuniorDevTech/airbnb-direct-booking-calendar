import { create } from "zustand";

import { getSettings, updateSettings } from "../services/settingsApi";

const useSettingsStore = create((set) => ({
  settings: null,

  loading: false,

  fetchSettings: async () => {
    set({ loading: true });

    try {
      const settings = await getSettings();

      set({ settings });
    } finally {
      set({ loading: false });
    }
  },

  saveSettings: async (data) => {
    const settings = await updateSettings(data);

    set({ settings });

    return settings;
  },
}));

export default useSettingsStore;
