import api from "../../../services/api";

export const getStats = async () => {
  const response = await api.get("/dashboard/stats");

  return response.data;
};

export const getRecentReservations = async () => {
  const response = await api.get("/dashboard/recent-reservations");

  return response.data;
};
