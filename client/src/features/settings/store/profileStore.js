import { create } from "zustand";

import { getProfile, updateProfile } from "../services/profileApi";

const useProfileStore = create((set) => ({
  profile: null,

  loading: false,

  fetchProfile: async () => {
    set({ loading: true });

    try {
      const profile = await getProfile();

      set({ profile });
    } finally {
      set({ loading: false });
    }
  },

  saveProfile: async (data) => {
    const profile = await updateProfile(data);

    set({ profile });

    return profile;
  },
}));

export default useProfileStore;
