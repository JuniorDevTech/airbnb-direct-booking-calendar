export function checkDateConflict(events, startDate, endDate) {
  return events.some((event) => {
    const existingStart = new Date(event.start);

    const existingEnd = new Date(event.end);

    const newStart = new Date(startDate);

    const newEnd = new Date(endDate);

    return newStart < existingEnd && newEnd > existingStart;
  });
}
