import { create } from "zustand";

const useReservationStore = create((set) => ({
  reservations: [],

  addReservation: (reservation) =>
    set((state) => ({
      reservations: [...state.reservations, reservation],
    })),
}));

export default useReservationStore;
