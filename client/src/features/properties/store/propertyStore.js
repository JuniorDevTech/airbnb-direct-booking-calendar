import { create } from "zustand";

import {
  getProperties,
  createProperty,
  deleteProperty,
} from "../services/propertyApi";

const usePropertyStore = create((set) => ({
  properties: [],
  loading: false,

  fetchProperties: async () => {
    try {
      set({ loading: true });

      const data = await getProperties();

      set({
        properties: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  addProperty: async (payload) => {
    const property = await createProperty(payload);

    set((state) => ({
      properties: [property, ...state.properties],
    }));
  },

  removeProperty: async (id) => {
    await deleteProperty(id);

    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
    }));
  },
}));

export default usePropertyStore;
