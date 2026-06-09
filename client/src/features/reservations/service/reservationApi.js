import api from "../../../services/api";

export const createReservation = async (data) => {
  const response = await api.post("/reservations", data);

  return response.data;
};

export const getReservations = async (propertyId) => {
  const response = await api.get(`/reservations/property/${propertyId}`);

  return response.data;
};

export const deleteReservation = async (id) => {
  const response = await api.delete(`/reservations/${id}`);

  return response.data;
};

export const blockReservation = async (data) => {
  const response = await api.post("/reservations", {
    ...data,
    source: "BLOCKED",
  });

  return response.data;
};

export const updateReservation = async (id, data) => {
  const response = await api.put(`/reservations/${id}`, data);

  return response.data;
};
