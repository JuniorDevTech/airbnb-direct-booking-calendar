import { getStats, getRecentReservations } from "./dashboard.service.js";

export const stats = async (req, res, next) => {
  try {
    const data = await getStats(req.user.id);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const recentReservations = async (req, res, next) => {
  try {
    const data = await getRecentReservations(req.user.id);

    res.json(data);
  } catch (error) {
    next(error);
  }
};
