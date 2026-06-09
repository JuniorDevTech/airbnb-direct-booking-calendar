import { getCalendarEvents } from "./calendar.service.js";

export const getCalendar = async (req, res, next) => {
  try {
    const events = await getCalendarEvents(req.params.propertyId);

    res.json(events);
  } catch (error) {
    next(error);
  }
};
