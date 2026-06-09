import api from "../../../services/api";

export const getCalendarEvents = async (propertyId) => {
  const response = await api.get(`/calendar/${propertyId}`);

  return response.data;
};
