import { create } from "zustand";

import { changePassword } from "../services/securityApi";

const useSecurityStore = create(() => ({
  changePassword: async (data) => {
    return await changePassword(data);
  },
}));

export default useSecurityStore;
