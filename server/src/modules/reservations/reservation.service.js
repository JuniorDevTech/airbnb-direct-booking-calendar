import * as reservationRepository from "./reservation.repository.js";

import { hasDateConflict } from "../../utils/checkDateConflict.js";

export const createReservation = async (data) => {
  const reservations = await reservationRepository.findAllByProperty(
    data.propertyId,
  );

  const conflict = hasDateConflict(reservations, data.startDate, data.endDate);

  if (conflict) {
    throw new Error("Ces dates sont déjà occupées");
  }

  return reservationRepository.create({
    ...data,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
  });
};

export const getReservations = async (propertyId) => {
  return reservationRepository.findAllByProperty(propertyId);
};
export const updateReservation = async (id, data) => {
  return reservationRepository.update(id, data);
};

export const deleteReservation = async (id) => {
  return reservationRepository.remove(id);
};
