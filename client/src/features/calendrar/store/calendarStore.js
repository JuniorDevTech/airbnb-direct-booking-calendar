import { create } from "zustand";

import { getCalendarEvents } from "../services/calendarApi";

const useCalendarStore = create((set) => ({
  events: [],

  loading: false,

  fetchEvents: async (propertyId) => {
    try {
      set({
        loading: true,
      });

      const data = await getCalendarEvents(propertyId);

      set({
        events: data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({
        loading: false,
      });
    }
  },
}));

export default useCalendarStore;
