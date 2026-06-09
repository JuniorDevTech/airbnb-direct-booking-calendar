export const hasDateConflict = (reservations, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return reservations.some((reservation) => {
    const existingStart = new Date(reservation.startDate);

    const existingEnd = new Date(reservation.endDate);

    return start < existingEnd && end > existingStart;
  });
};
