import * as calendarRepository from "./calendar.repository.js";

const getEventColor = (source) => {
  switch (source) {
    case "AIRBNB":
      return "#ef4444";

    case "DIRECT":
      return "#3b82f6";

    case "BLOCKED":
      return "#6b7280";

    default:
      return "#64748b";
  }
};

export const getCalendarEvents = async (propertyId) => {
  const reservations =
    await calendarRepository.getPropertyReservations(propertyId);

  return reservations.map((reservation) => ({
    id: reservation.id,

    title: reservation.title,

    start: reservation.startDate,

    end: reservation.endDate,

    color: getEventColor(reservation.source),

    extendedProps: {
      source: reservation.source,
    },
  }));
};
