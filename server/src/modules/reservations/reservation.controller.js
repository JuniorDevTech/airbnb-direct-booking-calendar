import * as reservationService from "./reservation.service.js";

export const create = async (req, res, next) => {
  try {
    const reservation = await reservationService.createReservation(req.body);

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const reservations = await reservationService.getReservations(
      req.params.propertyId,
    );

    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const reservation = await reservationService.updateReservation(
      req.params.id,
      req.body,
    );

    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await reservationService.deleteReservation(req.params.id);

    res.json({
      message: "Réservation supprimée",
    });
  } catch (error) {
    next(error);
  }
};
